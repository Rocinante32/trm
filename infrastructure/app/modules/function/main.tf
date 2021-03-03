data "archive_file" "main" {
  type        = "zip"
  source_dir  = var.source_path
  output_path = "${var.source_path}/../${var.name}.zip"
}

resource "google_storage_bucket_object" "main" {
  provider = google-beta

  name   = format("app/%s/%s-%s.zip", terraform.workspace, var.name, data.archive_file.main.output_md5)
  bucket = var.storage_bucket_name
  source = data.archive_file.main.output_path
}

resource "google_cloudfunctions_function" "main" {
  provider = google-beta

  name    = var.name
  runtime = "nodejs12"

  available_memory_mb   = var.available_memory_mb
  timeout               = var.timeout
  max_instances         = 10
  source_archive_bucket = var.storage_bucket_name
  source_archive_object = google_storage_bucket_object.main.name
  trigger_http          = true
  entry_point           = "handler"
  environment_variables = var.environment_variables
  service_account_email = var.service_account_email

  project = var.project
}

resource "google_cloudfunctions_function_iam_member" "invoker" {
  provider = google-beta

  project        = google_cloudfunctions_function.main.project
  region         = google_cloudfunctions_function.main.region
  cloud_function = google_cloudfunctions_function.main.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}

resource "google_cloud_scheduler_job" "main" {
  count = var.schedule != null ? 1 : 0

  project          = google_cloudfunctions_function.main.project
  region           = google_cloudfunctions_function.main.region
  name             = "trm-function-${var.name}"
  schedule         = var.schedule
  time_zone        = "Europe/Berlin"
  attempt_deadline = "320s"

  retry_config {
    retry_count = 1
  }

  http_target {
    http_method = "POST"
    uri         = google_cloudfunctions_function.main.https_trigger_url
  }
}
