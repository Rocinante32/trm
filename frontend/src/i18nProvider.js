import englishMessages from 'ra-language-english';
import polyglotI18nProvider from 'ra-i18n-polyglot';

let messages = {
  trm: {
    menu: {
      dashboard: 'Dashboard',
      profile: 'My Profile',
      techies: 'Techies',
      applications: 'Applications',
      academy: 'Academy',
      ds: 'Data Science',
      ai: 'Artificial Intelligence',
      webdev: 'Web Development',
      ux: 'UX Design',
      dropped: 'Dropped',
      alumni: 'Alumni',
      projects: 'Projects',
      reports: 'Reports',
      techieActivity: 'Techie Activity',
      csvImport: 'CSV Import',
      settings: 'Settings',
      team: 'My Team',
      userHandbook: 'User Handbook'
    }
  },
  techlabs: {
    locations: {
      BARCELONA: 'Barcelona',
      DUESSELDORF: 'Düsseldorf',
      BERLIN: 'Berlin',
      DORTMUND: 'Dortmund',
      COPENHAGEN: 'Copenhagen',
      MUNICH: 'Munich',
      MUENSTER: 'Münster',
      CURITIBA: 'Curitiba',
      AACHEN: 'Aachen',
      MEDELLIN: 'Medellin',
      HAMBURG: 'Hamburg',
      PLAYGROUND: 'Playground',
      GLOBAL: 'Global',
      CODEATHOME: 'Code at Home',
      MANNHEIM: 'Mannheim',
      STOCKHOLM: 'Stockholm',
      LONDON: 'London',
    },
  },
  resources: {
    techies: {
      name: 'Techie |||| Techies',
      fields: {
        id: 'ID',
        first_name: 'First Name',
        last_name: 'Last Name',
        techie_key: 'Techie Key',
        application_track_choice: 'Application Track Choice',
        google_account: 'Google Account',
        github_handle: 'GitHub Handle',
        linkedin_profile_url: 'LinkedIn Profile URL',
        slack_member_id: 'Slack Member ID',
        edyoucated_imported_at: 'Imported edyoucated activity at',
        edyoucated_next_import_after: 'Will import edyoucated activity after',
        edyoucated_user_id: 'edyoucated User ID'
      }
    },
    forms: {
      name: 'Form |||| Forms',
      fields: {
        typeform_id: 'Typeform Form ID',
        imports_techies: 'Imports Techies?'
      },
      helper_texts: {
        form_id: 'The Typeform ID can be found in the form URL, e.g. https://techlabsorg.typeform.com/to/ID'
      }
    },
    form_responses: {
      name: 'Form Response |||| Form Responses',
      fields: {
        'techie_id': 'Techie ID',
        'form.description': 'Form',
        'techie.first_name': 'First Name',
        'techie.last_name': 'Last Name'
      }
    },
    team_members: {
      name: 'Team Member |||| Team Members',
      fields: {
        first_name: 'First Name',
        last_name: 'Last Name',
        functional_team: 'Functional Team',
      }
    },
    semesters: {
      name: 'Semester |||| Semesters',
      fields: {
        techie_key_prefix: 'Techie Key Prefix'
      }
    },
    techie_activity_report: {
      name: 'Techie Activity Report',
      fields: {
        id: 'Name'
      }
    }
  },
  ...englishMessages
};

export default polyglotI18nProvider(() => messages)
