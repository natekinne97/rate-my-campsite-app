import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Menu from './Menu';

describe.only('Review form component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Menu />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<Menu />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders the UI as expected with no unreads', () => {
        const tree = renderer
            .create(<Menu />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});