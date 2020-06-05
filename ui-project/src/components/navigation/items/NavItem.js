import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from 'styled-components';
import './Item.scss'
const StyledNavItem = styled.div``;
const NavIcon = styled.div``;

export default class NavItem extends React.Component {
    handleClick = () => {
        const { path, onItemClick } = this.props;
        onItemClick(path);
    }

    render() {
        const { active } = this.props;
        return (
            <StyledNavItem className='nav-item' active={active}>
                <Link to={this.props.path} className={this.props.css} onClick={this.handleClick}>
                    <NavIcon className='nav-icon'/>
                </Link>
            </StyledNavItem>
        );
    }
}
