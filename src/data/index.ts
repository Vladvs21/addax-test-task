import { useMemo } from "react"
import { DayT, LabelI, MetaDataI, MonthT, TaskI } from "../interfaces"

export const labelsArray:LabelI[] = [
    {
        id: 0,
        color: '#FF8811',
        text: 'Label 1'
    },
    {
        id: 1,
        color: '#F4D06F',
        text: 'Label 2'
    },
    {
        id: 2,
        color: '#392F5A',
        text: 'Label 3'
    },
    {
        id: 3,
        color: '#125431',
        text: 'Label 4'
    },
    {
        id: 4,
        color: '#9DD9D2',
        text: 'Label 5'
    },
]

export const tasksArray:TaskI[] = [
    {
        id: 0,
        label: [labelsArray[0], labelsArray[1]],
        text: 'Task 1',
        date: '2023-03-17'
    },
    {
        id: 1,
        label: [labelsArray[2], labelsArray[0]],
        text: 'Task 2',
        date: '2023-03-18'
    },
    {
        id: 2,
        label: [labelsArray[2]],
        text: 'Task 3',
        date: '2023-03-19'
    },
    {
        id: 3,
        label: [labelsArray[1], labelsArray[3]],
        text: 'Task 4',
        date: '2023-03-17'
    },
    {
        id: 4,
        label: [labelsArray[4], labelsArray[2]],
        text: 'Task 5',
        date: '2023-03-17'
    },
]