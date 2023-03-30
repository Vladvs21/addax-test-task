import styled from 'styled-components'

export const LabelsCon = styled.div`
    .calendar__header__left__colorButton {
        height: 30px;
        min-width: 150px;
        padding: 2.5px;
        border-radius: 5px;
        background: lightgray;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .calendar__header__left__colorButton__color {
            min-width: 5px;
            height: 25px;
            flex: 1;

            &:first-of-type {
                border-radius: 4px 0 0 4px;
            }

            &:last-of-type {
                border-radius: 0 4px 4px 0;
            }

            &:first-of-type:last-of-type {
                border-radius: 4px;
            }
        }
    }

    .calendar__header__left__colorContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        transition: all .3s ease-in-out;
        cursor: pointer;

        .calendar__header__left__colorContainer__color {
            width: 30px;
            height: 30px;
            border-radius: 5px;
            margin: 2.5px 0;
            transition: all .3s ease-in-out;
        }

        &.selected {
            color: black;
            gap: 7px;

            .calendar__header__left__colorContainer__color {
                width: 28px;
                height: 28px;
                outline-offset: 1px;
                outline: 1px solid;
                margin: 3.5px 0;
            }
        }

        &.add {
            position: relative;
            border: 1px dashed gray;
            height: 30px;
            border-radius: 5px;
            margin: 2.5px 0 0;

            &:after {
                content: '\\002B';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

        &.create {
            margin: 2.5px 0;

            .colorInputContainer {
                position: relative;
                width: 30px;
                height: 30px;
                border-radius: 5px;
                overflow: hidden;
                
                input[type=color] {
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    padding: 0;
                    background: transparent;
                }

                &:before {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    content: '\\270E';
                }
            }

            input[type=text] {
                width: calc(100% - 70px);
                background: lightgray;
                border-radius: 5px;
                padding: 5px 10px;
                outline: none !important;
                
            }

            .confirm {
                width: 30px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: green;
            }
        }

        .edit {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: all .3s ease-in-out;
        }
        
        &:hover {
            .edit {
                opacity: 1;
            }
        }
    }
`