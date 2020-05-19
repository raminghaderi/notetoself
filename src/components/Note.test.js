import React from "react";
import { mount } from 'enzyme';
import Note from './Note';

const props = { note: { text: 'I am a dummy text' } };

describe('Note', () => {
    let note = mount(<Note {...props} />);

    it('should render Note correclty', () => {
        expect(note.find('p').text()).toEqual(props.note.text);
    });
})
