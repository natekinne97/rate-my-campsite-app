import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Campsite from './Campsite';

describe.only('Review form component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Campsite />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<Campsite />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

});