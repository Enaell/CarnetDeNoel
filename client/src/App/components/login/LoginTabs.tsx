import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {LoginForm} from './LoginForm';
import {SigninForm} from './SigninForm';
import translate from 'counterpart';
import { Column, Row } from '../common/Flexbox';

type LoginTabsType = {
    tabNumber: number,
    handleTabChange: any,
    handlePasswordChange: any,
    passwordError: any,
    handleUserNameChange: any,
    usernameError: any,
    visitorOption?: boolean,
    orientation?: 'vertical' | 'horizontal',
    style?: any,
    children?: any
}

const TabsWrapper = ({orientation, children, style={}}: {
    orientation: 'vertical' | 'horizontal',
    children: React.ReactNode,
    style?: any
}) => {
    return (<>
        {orientation === 'horizontal' 
        ? <Column  vertical={'space-between'} style={style}> {children} </Column>
        : <Row horizontal='space-between' style={{ paddingTop: '15px', ...style}}> {children} </Row>
    }
    </>)
}

export const LoginTabs = ({
    tabNumber, 
    handleTabChange, 
    handlePasswordChange, 
    passwordError, 
    usernameError, 
    handleUserNameChange,
    orientation = 'horizontal',
    style = {},
    children
} : LoginTabsType) => {
    return (
        <TabsWrapper orientation={orientation} style={style}>
            <Tabs
                orientation={orientation}
                value={orientation === 'horizontal' ? tabNumber - 1 : tabNumber}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="secondary"
                centered
                style={orientation === 'vertical' ? {paddingTop: '15px'}: {}}
            >
                <Tab label={translate('connection.signin')}/>
                <Tab label={translate('connection.login')}/>
            </Tabs>
            <Column vertical='space-around' style={{width: orientation === 'vertical' ? 'calc(100% - 160px)': 'inherit', padding: '0 20px'}}>
                {tabNumber === 0 &&
                <SigninForm
                    handleUserNameChange = {handleUserNameChange} 
                    handlePasswordChange = {handlePasswordChange}
                    passwordError = {passwordError}
                    usernameError = {usernameError}
                />
                }
                {tabNumber === 1 && 
                <LoginForm 
                    handleUserNameChange = {handleUserNameChange} 
                    handlePasswordChange = {handlePasswordChange}
                    passwordError = {passwordError}
                    usernameError = {usernameError}
                />
                }
                {children}
            </Column>
        </TabsWrapper>
    )
} 
