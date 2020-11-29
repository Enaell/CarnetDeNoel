import React from 'react';
import { Row } from '../common/Flexbox';
import { UserType } from '../common/types';
import { Route } from 'react-router-dom';
import { NotebookPanel } from './NotebookPanel';
import { useNoteBook } from './notebookHooks';

export const NotebookPage = () => {

  return(
      <Row horizontal='center'>
        <Route
          key={'notebook'}
          path={'/notebook/gifts'}
          render={ props => <NotebookPanel {...props} />}
        />
      </Row>
    );
}