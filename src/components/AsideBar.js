import React from "react";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarContent
} from 'react-pro-sidebar';

import 'react-pro-sidebar/dist/css/styles.css';

class AsideBar extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }

    render() {
        return (
            <ProSidebar
                image={this.props.image ? false : false}
                rtl={this.props.rtl}
                collapsed={this.props.collapsed}
                toggled={this.props.toggled}
                breakPoint="md"
                onToggle={this.props.handleToggleSidebar}
            >
                <SidebarHeader>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="circle">
                    </Menu>
                    <Menu iconShape="circle">
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        );
    };
}

export { AsideBar };