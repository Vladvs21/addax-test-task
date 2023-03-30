import styled from 'styled-components'

export const DayCon = styled.div`
    background: lightgreen;
    border-radius: 5px;
    padding: 5px;

    &.inactive {
        background: lightgray;
    }

    &.current {
        background: green;

        .calendar__body__day__title .calendar__body__day__title__date {
            color: white;
        }
    }

    .calendar__body__day__title {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;

        .calendar__body__day__title__date {
            color: black;
            font-size: 16px;
        }

        .calendar__body__day__title__numOfCards {
            color: gray;
            font-size: 12px;
        }
    }

    .calendar__body__day__card {
        background: white;
        width: 100%;
        border-radius: 5px;
        padding: 5px;
        margin-bottom: 5px;

        &.add {
            position: relative;
            max-height: 0;
            border: 1px dashed gray;
            background: transparent;
            border-radius: 5px;
            height: 40px;
            cursor: pointer;
            transition: all .3s ease-in-out;
            opacity: 0;

            &:after {
                content: '\\002B';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

        .calendar__body__day__card__colors {
            display: flex;
            flex-direction: row;
            gap: 5px;

            .calendar__body__day__card__colors-single {
                width: calc(20% - 1px);
                height: 5px;
                border-radius: 5px;
            }
        }

        .calendar__body__day__card__text {
            display: flex;
            gap: 5px;

            .edit {
                width: 30px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: all .3s ease-in-out;
                cursor: pointer;
            }

            &:hover {
                .edit {
                    opacity: 1;
                }
            }
        }

        .row {
            display: flex;
            flex-direction: row;
            gap: 5px;
            margin-top: 5px;

            input {
                outline: none !important;
                border-radius: 5px;
                width: calc(100% - 35px);
                padding: 5px 10px;
                background: lightgray;
            }

            .confirm {
                width: 30px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: green;
                cursor: pointer;
            }
        }
    }

    &:hover .calendar__body__day__card.add {
        max-height: 100px;
        opacity: 1;
    }
`