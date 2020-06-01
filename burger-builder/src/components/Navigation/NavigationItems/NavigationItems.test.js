import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigtionItems';
import NavigationItem from './NavigationItem/NavigationItem';


configure({ adapter: new Adapter()});

describe('<NavigationItem />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
    })
    it('should render 2 navigation item if not authenticated', () => {
        //const wrapper = shallow(<NavigationItems/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render 3 navigation item if we are authenticated', () => {
        wrapper.setProps({
            isAuth: true
        });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render logout navigation item if we are authenticated', () => {
        wrapper.setProps({
            isAuth: true
        });
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
})