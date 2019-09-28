import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import CreatePage from './CreatePage';

describe.only('Review form component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CreatePage />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<CreatePage />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });



});