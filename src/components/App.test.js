import React from "react";
import { mount } from 'enzyme';
import App from "./App";

describe('App', () => {
    let app = mount(<App/>);

    it('should render the App title', () => {
        expect(app.find('h2').text()).toEqual('Note to Self');
    });

    it('should render the clear button', () => {
        expect(app.find('.btn').at(1).text()).toEqual('Clear');
    });

    describe('wehn rendering the form', () => {
        it('should create a Form component', () => {
            expect(app.find('Form').exists()).toBe(true);
        });

        it('should render a FormControl component', () => {
            expect(app.find('FormControl').exists()).toBe(true);
        });

        it('should render a submit button', () => {
            expect(app.find('.btn').at(0).text()).toBe('Submit');
        });
    });

    describe('when creating a note', () => {
        let testNote = 'test note';

        beforeEach(() => {
            app.find('FormControl').simulate('change', { target: { value: testNote } });
        })

        it('should update the text property in the state', () => {
            expect(app.state().text).toEqual('test note');
        });

        describe('and submitting the new note', () => {
            beforeEach(() => {
                app.find('.btn').at(0).simulate('click');
            });

            afterEach(() => {
                app.find('.btn').at(1).simulate('click');
            })

            it('should add the new note to the state', () => {
                expect(app.state().notes[0].text).toEqual(testNote);
            });

            describe('and remounting the component', () => {
                let app2;

                beforeEach(() => {
                    app2 = mount(<App/>)
                });

                it('should read the stored note cookie', () => {
                    expect(app2.state().notes).toEqual([{ text: testNote }]);
                });
            })
        });

        describe('and clicking the clear button', () => {
            beforeEach(() => {
                app.find('.btn').at(1).simulate('click');
            });

            it('should reset the notes property in the state', () => {
                expect(app.state().notes).toEqual([]);
            });
        })
    });
})
