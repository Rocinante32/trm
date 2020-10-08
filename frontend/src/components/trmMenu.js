import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { useTranslate, MenuItemLink } from 'react-admin';
import UserIcon from '@material-ui/icons/People';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import SchoolIcon from '@material-ui/icons/School';
import CommentIcon from '@material-ui/icons/Comment';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import DescriptionIcon from '@material-ui/icons/Description';
import ExploreIcon from '@material-ui/icons/Explore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StarsIcon from '@material-ui/icons/Stars';
import { ReactComponent as DSTrackLogo } from '../static/track-ds-grey.svg';
import { ReactComponent as AITrackLogo } from '../static/track-ai-grey.svg';
import { ReactComponent as WebDevTrackLogo } from '../static/track-webdev-grey.svg';
import { ReactComponent as UXTrackLogo } from '../static/track-ux-grey.svg';
import { stringify } from 'query-string';

import SubMenu from './trmSubMenu'

const TRMMenu = ({ onMenuClick, dense, logout }) => {
  const [state, setState] = useState({
      menuTechies: true,
      menuReports: true,
      menuSettings: true,
  });
  const translate = useTranslate();
  const isXSmall = useMediaQuery((theme) =>
      theme.breakpoints.down('xs')
  );
  const open = useSelector((state) => state.admin.ui.sidebarOpen);
    useSelector((state) => state.theme); // force rerender on theme change
  const handleToggle = (menu) => {
      setState(state => ({ ...state, [menu]: !state[menu] }));
  };
  return (
    <React.Fragment>
        {' '}
        <SubMenu
            handleToggle={() => handleToggle('menuTechies')}
            isOpen={state.menuTechies}
            sidebarIsOpen={open}
            name="trm.menu.techies"
            icon={<UserIcon />}
            dense={dense}
        >
            <MenuItemLink
                to={{pathname: `/techies`, search: stringify({
                    page: 1,
                    perPage: 25,
                    sort: 'id',
                    order: 'DESC',
                    filter: {},
                })}}
                primaryText={'All ' + translate(`resources.techies.name`, {
                    smart_count: 2,
                })}
                leftIcon={<UserIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
                exact
            />
            <MenuItemLink
                to={{pathname: `/techies`, search: stringify({
                    page: 1,
                    perPage: 25,
                    sort: 'id',
                    order: 'DESC',
                    filter: JSON.stringify({ state: 'APPLICANT' }),
                })}}
                primaryText={translate('trm.menu.applications')}
                leftIcon={<AssignmentTurnedInIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
                exact
            />
            <MenuItemLink
                to={{pathname: `/techies`, search: stringify({
                  page: 1,
                  perPage: 25,
                  sort: 'id',
                  order: 'DESC',
                  filter: JSON.stringify({ state: 'LEARNER' }),
                })}}
                primaryText={translate('trm.menu.academy')}
                leftIcon={<SchoolIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
                exact
            />
            <MenuItemLink
                to={{pathname: `/techies`, search: stringify({
                  page: 1,
                  perPage: 25,
                  sort: 'id',
                  order: 'DESC',
                  filter: JSON.stringify({ state: 'LEARNER', track: 'DS' }),
                })}}
                primaryText={translate('trm.menu.ds')}
                leftIcon={<DSTrackLogo />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
                exact
            />
            <MenuItemLink
                to={{pathname: `/techies`, search: stringify({
                  page: 1,
                  perPage: 25,
                  sort: 'id',
                  order: 'DESC',
                  filter: JSON.stringify({ state: 'LEARNER', track: 'AI' }),
                })}}
                primaryText={translate('trm.menu.ai')}
                leftIcon={<AITrackLogo />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
                exact
            />
            <MenuItemLink
                to={{pathname: `/techies`, search: stringify({
                  page: 1,
                  perPage: 25,
                  sort: 'id',
                  order: 'DESC',
                  filter: JSON.stringify({ state: 'LEARNER', track: 'WEBDEV' }),
                })}}
                primaryText={translate('trm.menu.webdev')}
                leftIcon={<WebDevTrackLogo />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
                exact
            />
            <MenuItemLink
                to={{pathname: `/techies`, search: stringify({
                  page: 1,
                  perPage: 25,
                  sort: 'id',
                  order: 'DESC',
                  filter: JSON.stringify({ state: 'LEARNER', track: 'UX' }),
                })}}
                primaryText={translate('trm.menu.ux')}
                leftIcon={<UXTrackLogo />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
                exact
            />
            <MenuItemLink
                to={{pathname: `/techies`, search: stringify({
                  page: 1,
                  perPage: 25,
                  sort: 'id',
                  order: 'DESC',
                  filter: JSON.stringify({ state: 'DROPPED' }),
                })}}
                primaryText={translate('trm.menu.dropped')}
                leftIcon={<ExitToAppIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
                exact
            />
            <MenuItemLink
                to={{pathname: `/techies`, search: stringify({
                  page: 1,
                  perPage: 25,
                  sort: 'id',
                  order: 'DESC',
                  filter: JSON.stringify({ state: 'ALUMNI' }),
                })}}
                primaryText={translate('trm.menu.alumni')}
                leftIcon={<StarsIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
                exact
            />
        </SubMenu>
        <SubMenu
            handleToggle={() => handleToggle('menuReports')}
            isOpen={state.menuReports}
            sidebarIsOpen={open}
            name="trm.menu.reports"
            icon={<ExploreIcon />}
            dense={dense}
        >
            <MenuItemLink
                to={`/techie-activity`}
                primaryText={translate('trm.menu.techieActivity')}
                leftIcon={<ExploreIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
                exact
            />
        </SubMenu>
        <SubMenu
            handleToggle={() => handleToggle('menuSettings')}
            isOpen={state.menuSettings}
            sidebarIsOpen={open}
            name="trm.menu.settings"
            icon={<SettingsIcon />}
            dense={dense}
        >
            <MenuItemLink
                to={`/forms`}
                primaryText={translate(`resources.forms.name`, {
                    smart_count: 2,
                })}
                leftIcon={<ChatBubbleOutlineIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            <MenuItemLink
                to={`/form_responses`}
                primaryText={translate(`resources.form_responses.name`, {
                    smart_count: 2,
                })}
                leftIcon={<CommentIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            <MenuItemLink
                to={`/semesters`}
                primaryText={translate(`resources.semesters.name`, {
                    smart_count: 2,
                })}
                leftIcon={<QueryBuilderIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            <MenuItemLink
                to={`/team_members`}
                primaryText={translate(`resources.team_members.name`, {
                    smart_count: 2,
                })}
                leftIcon={<PeopleOutlineIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            <MenuItemLink
                to={`/csv-import`}
                primaryText={translate('trm.menu.csvImport')}
                leftIcon={<DescriptionIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
                exact
            />
        </SubMenu>
        {isXSmall && logout}
      </React.Fragment>
  )
}

export default TRMMenu
