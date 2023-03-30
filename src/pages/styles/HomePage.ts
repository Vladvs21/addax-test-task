import styled from 'styled-components'

export const HomePageCon = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-top: 30px;

    .calendar__header {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;

        .calendar__header__left {
            place-self: start;
            align-self: center;
            display: flex;
            align-items: center;

            & > input {
                outline: none !important;
                background: lightgray;
                border: none;
                border-radius: 5px;
                padding: 5px 10px;
                margin: 0 5px;
            }
        }

        .calendar__header__identifier {
            place-self: center;
            align-self: center;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 20px;

            .calendar__header__identifier__btn {
                width: 30px;
                height: 30px;
                background: rgba(0,0,0,0.1);
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }

            .calendar__header__identifier__title {
                max-width: calc(100% - 100px);
                text-align: center;
            }
        }

        .calendar__header__buttons {
            place-self: end;
            align-self: center;
            display: flex;
            flex-direction: row;
            gap: 5px;

            & > div {
                padding: 3px 10px;
                background: lightgray;
                border-radius: 5px;
                cursor: pointer;
                transition: all .3s ease-in-out;
                box-shadow: none;
                white-space: nowrap;

                &:hover {
                    box-shadow: 2px 2px 10px 3px rgba(0,0,0,0.1);
                    color: #000;
                }

                input {
                    display: none;
                }
            }
        }
    }

    .calendar__subheader {
        max-width: calc(100vw - 30px);
        padding: 30px 0 10px;
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 5px;

        .calendar__subheader__day {
            place-self: center;
        }
    }

    .calendar__body {
        max-width: calc(100vw - 30px);
        flex-grow: 1;
        display: grid;
        height: 100%;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 5px;
    }

    @media (max-width: 992px) {
        .calendar__header {
            grid-template-columns: repeat(1, 1fr);
            grid-auto-flow: dense;

            .calendar__header__left,
            .calendar__header__buttons {
                place-self: center;
            }

            .calendar__header__buttons {
                grid-row: 1;
            }
        }
    }
`