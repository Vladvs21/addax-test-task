import { FC, useMemo, useState, useEffect, useRef, ChangeEvent } from 'react'
import { useDebounce } from '../hooks'

import * as htmlToImage from 'html-to-image';

import { HomePageCon } from './styles/HomePage'

import { ColorT, DayT, FilterI, LabelI, MetaDataI, MonthT, TaskI, WorldwideHolidaysI } from '../interfaces'; 
import { tasksArray, labelsArray } from '../data';
import { getData } from '../functions';
import Labels from '../components/Labels';
import Day from '../components/Day';
import { DayCon } from '../components/styles/Day';

const HomePage:FC = () => {
    // Hooks     -     Refs

    const inputRef = useRef<HTMLInputElement>(null)
    const calendarRef = useRef<HTMLDivElement>(null)
    
    // Hooks     -     States
    
    const [metaData, setMetaData] = useState<MetaDataI>({
        currentYear: new Date().getFullYear(),
        currentMonth: new Date().getMonth(),
        currentDay: new Date().getDate(),
        selectedYear: new Date().getFullYear(),
        selectedMonth: new Date().getMonth(),
        selectedDay: new Date().getDate(),
    })
    const [worldwideHolidays, setWorldwideHolidays] = useState<WorldwideHolidaysI[]>([])
    const [tasks, setTasks] = useState<TaskI[]>([])
    const [labels, setLabels] = useState<LabelI[]>([])
    const [filter, setFilter] = useState<FilterI>({
        text: '',
        label: [],
        searchTerm: ''
    })
    const [draggedTask, setDraggedTask] = useState<TaskI>(tasks[0])
    
    // Hooks     -     Debounce
    
    const debouncedSearchTerm: string = useDebounce<string>(filter.text, 500);

    // Hooks     -     Effects

    useEffect(() => {
        getData<WorldwideHolidaysI[]>('https://date.nager.at/api/v3/PublicHolidays/2023/UA').then(res => setWorldwideHolidays(res))
        setTasks(tasksArray)
        setLabels(labelsArray)
    }, [])

    useEffect(() => {
        const newFilter:FilterI = {...filter}
        newFilter.searchTerm = filter.text
        setFilter(newFilter)
    }, [debouncedSearchTerm])

    useEffect(() => {
        if(tasks.length && labels.length) {
            const newTasks = [...tasks]
            newTasks.forEach(task => task.label.forEach(label => label.color = labels.find(e => e.id === label.id)?.color as ColorT))
            setTasks(newTasks)
        }
    }, [labels])



    // Variables     -     Calendar configuration

    const months:MonthT[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const days:DayT[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    const monthOffset:number = useMemo(() => (new Date(`1 ${months[metaData.selectedMonth]} ${metaData.selectedYear}`).getDay() + 6) % 7, [metaData.selectedMonth, metaData.selectedYear])
    const prevMonthsDaysNumber:number = useMemo(() => new Date(metaData.selectedYear, metaData.selectedMonth, 0).getDate(), [metaData.selectedMonth, metaData.selectedYear])
    const monthDaysNumber:number = useMemo(() => new Date(metaData.selectedYear, metaData.selectedMonth + 1, 0).getDate(), [metaData.selectedMonth, metaData.selectedYear])

    // Variables     -     Data filtration

    const filteredHolidays:WorldwideHolidaysI[] = useMemo(() => worldwideHolidays.filter(e => e.date.includes(`-${metaData.selectedMonth < 9 ? `0${metaData.selectedMonth + 1}` : metaData.selectedMonth + 1}-`)), [worldwideHolidays, metaData.selectedMonth, metaData.selectedYear])
    const filteredTasks:TaskI[] = useMemo(() => tasks.filter(e => (e.label.some(el => filter.label.length === 0 ? true : filter.label.findIndex(l => l.id === el.id) != -1) || e.label.every(el => filter.label.length === 0 ? true : filter.label.includes(el))) && e.text.toLowerCase().includes(filter.searchTerm || '') && e.date.includes(`${metaData.selectedYear}-${metaData.selectedMonth < 9 ? `0${metaData.selectedMonth + 1}` : metaData.selectedMonth + 1}-`)), [tasks, metaData.selectedMonth, metaData.selectedYear, filter.searchTerm, filter.label])



    // Funtions     -     Calendar flipping

    const handleChangeMonth = (delta: 1 | -1) : void => {
        const newMetaData:MetaDataI = {...metaData}
        if(newMetaData.selectedMonth === 0 && delta === -1) {
            newMetaData.selectedMonth = 11
            newMetaData.selectedYear -= 1
        } else if(newMetaData.selectedMonth === 11 && delta === 1) {
            newMetaData.selectedMonth = 0
            newMetaData.selectedYear += 1
        } else {
            newMetaData.selectedMonth = newMetaData.selectedMonth + delta
        }
        setMetaData(newMetaData)
    }

    // Funtions     -     Tasks filtration

    const handleChangeFilterText = (text: string): void => {
        const newFilter:FilterI = {...filter}
        newFilter.text = text
        setFilter(newFilter)
    }

    // Funtions     -     Import tasks from .json file

    const readImportedFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.item(0)

        const fileReader = new FileReader();
        
        fileReader.readAsText(file as Blob);
        fileReader.onload = () => {
            if(fileReader.result) setTasks(JSON.parse(fileReader.result as string));
        };
    }

    // Funtions     -     Export task to .json file

    const exportData = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(tasks))}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json";
    
        link.click();
    };

    // Funtions     -     Export calendar as .jpeg image
    
    const exportAsImg = () => {
        htmlToImage.toJpeg(calendarRef.current as HTMLElement, { quality: 0.95 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = `calendar-${metaData.selectedMonth}-${metaData.selectedYear}.jpeg`;
                link.href = dataUrl;
                link.click();
            });
    }



    // Return

    return (
        <HomePageCon className='uk-container'>
            <div className="calendar__header">
                <div className="calendar__header__left">
                    &#128269;
                    <input type="text" value={filter.text} onChange={(e: React.FormEvent<HTMLInputElement>) => handleChangeFilterText(e.currentTarget.value)} placeholder='Search...' />
                    
                    <Labels 
                        labels={labels} 
                        setLabels={setLabels} 
                        selectedLabes={filter} 
                        setSelectedLabes={setFilter} 
                        createEdit 
                    />
                </div>

                <div className="calendar__header__identifier">
                    <div className="calendar__header__identifier__btn" onClick={() => handleChangeMonth(-1)}>&#10092;</div>

                    <div className="calendar__header__identifier__title">{months[metaData.selectedMonth]} {metaData.selectedYear}</div>
                    
                    <div className="calendar__header__identifier__btn" onClick={() => handleChangeMonth(1)}>&#10093;</div>
                </div>

                <div className="calendar__header__buttons">
                    <div onClick={() => inputRef.current?.click()}>
                        Import
                        <input type="file" ref={inputRef} onChange={e => readImportedFile(e)} accept=".json" />
                    </div>
                    <div onClick={exportData}>Export</div>
                    <div onClick={exportAsImg}>Export as Jpeg</div>
                </div>
            </div>

            <div className="calendar__subheader">
                {
                    days.map(el => 
                        <div key={el} className='calendar__subheader__day'>{el}</div>
                    )
                }
            </div>

            <div className="calendar__body" ref={calendarRef}>
                {
                    Array.from(Array(monthOffset).keys()).map(el => 
                        <DayCon className="inactive">{prevMonthsDaysNumber - (monthOffset - 1) + el}</DayCon>
                    )
                }
                {
                    Array.from(Array(monthDaysNumber).keys()).map(el => {
                        return (
                            <Day 
                                metaData={metaData}
                                tasks={tasks}
                                setTasks={setTasks}
                                filteredTasks={filteredTasks}
                                filteredHolidays={filteredHolidays}
                                labels={labels}
                                setLabels={setLabels}
                                draggedTask={draggedTask} 
                                setDraggedTask={setDraggedTask}  
                                day={el}                           
                            />
                        )
                    })
                }
                {
                    Array.from(Array((7 - (monthOffset + monthDaysNumber) % 7) % 7).keys()).map(el => 
                        <DayCon className="inactive">{el + 1}</DayCon>
                    )
                }
            </div>
        </HomePageCon>
    )
}

export default HomePage