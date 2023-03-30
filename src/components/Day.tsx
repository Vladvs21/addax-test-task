import { FC,useState, DragEvent } from 'react'
import { dateToStandartFormat } from '../functions'
import { TaskI, LabelI, MetaDataI, WorldwideHolidaysI } from '../interfaces'
import Labels from './Labels'
import { DayCon } from './styles/Day'

interface DayPropsI {
    metaData: MetaDataI,
    tasks: TaskI[],
    setTasks: Function,
    filteredTasks: TaskI[],
    filteredHolidays: WorldwideHolidaysI[],
    labels: LabelI[],
    setLabels: Function,
    draggedTask: TaskI,
    setDraggedTask: Function,
    day: number
}

const Day:FC<DayPropsI> = ({metaData, tasks, setTasks, filteredTasks, filteredHolidays, labels, setLabels, draggedTask, setDraggedTask, day}) => {

    const [taskCreation, setTaskCreation] = useState<number>(-1)
    const [taskEdit, setTaskEdit] = useState<number>(-1)
    const [taskLabels, setTaskLabels] = useState<LabelI[]>([])
    const [taskText, setTaskText] = useState<string>('')


    const dayTasks = filteredTasks.filter(e => e.date === `${metaData.selectedYear}-${dateToStandartFormat(metaData.selectedMonth)}-${dateToStandartFormat(day)}`)
    const dayHolidays = filteredHolidays.filter(e => e.date.includes(`-${dateToStandartFormat(metaData.selectedMonth)}-${dateToStandartFormat(day)}`))




    // Funtions     -     Tasks drag and drop

    function handleDragStart(e: DragEvent<HTMLDivElement>, task: TaskI): void {
        setDraggedTask(task)
    }

    function handleDragEnd(e: DragEvent<HTMLDivElement>): void {
        (e.target as HTMLDivElement).style.boxShadow = 'none'
    }

    function handleDragLeave(e: DragEvent<HTMLDivElement>): void {
        (e.target as HTMLDivElement).style.boxShadow = 'none'
    }

    function handleDragOver(e: DragEvent<HTMLDivElement>): void {
        e.preventDefault()
        if((e.target as HTMLDivElement).className == 'calendar__body__day') (e.target as HTMLDivElement).style.boxShadow = '0 10px 30px green'
    }

    function handleDrop(e: DragEvent<HTMLDivElement>, day:number): void {
        e.preventDefault();
        (e.target as HTMLDivElement).style.boxShadow = 'none';
        
        const newTask:TaskI = {...draggedTask}
        newTask.date = `${metaData.selectedYear}-${dateToStandartFormat(metaData.selectedMonth)}-${dateToStandartFormat(day)}`

        let workTasks:TaskI[] = [...tasks.filter(t => t.date === newTask.date && t.id !== newTask.id)]
        const placeOfDrag = tasks.filter(t => t.date === newTask.date).findIndex(e => e.id === newTask.id)
        const place = Array.from((e.target as HTMLDivElement).closest('.calendar__body__day')?.children || []).splice(1).filter(el => !el.classList.contains('holiday')).map(child => child.getBoundingClientRect().y + child.getBoundingClientRect().height / 2).filter((el, index) => el < e.pageY && index !== placeOfDrag).length
        workTasks = [...workTasks.slice(0, place), newTask, ...workTasks.slice(place)]


        console.log(Array.from((e.target as HTMLDivElement).closest('.calendar__body__day')?.children || []).splice(1).filter(el => !el.classList.contains('holiday')).map(child => child.getBoundingClientRect().y + child.getBoundingClientRect().height / 2))
        console.log(e.pageY)

        const ids:number[] = workTasks.map(el => el.id)
        const newTasks:TaskI[] = [...(tasks.filter(el => !ids.includes(el.id))), ...workTasks]
        setTasks(newTasks)
    }

    // Funtions     -     Task create/save after creation/edit/save after editing

    const handleChangeTaskLabel = (label: LabelI): void => {
        let newTaskLabels:LabelI[] = [...taskLabels]
        if(newTaskLabels.findIndex(el => el.id === label.id) != -1) {
            newTaskLabels = newTaskLabels.filter(el => el.id !== label.id)
        } else {
            newTaskLabels = [...newTaskLabels, label]
        }
        setTaskLabels(newTaskLabels)
    }

    const handleCreateTask = (date: number) : void => {
        setTaskLabels([])
        setTaskText('')
        setTaskEdit(-1)

        setTaskCreation(date)
    }

    const addTask = () : void => {
        const newTask: TaskI = {
            id: Math.max(...tasks.map(el => el.id)) + 1,
            date: `${metaData.selectedYear}-${dateToStandartFormat(metaData.selectedMonth)}-${dateToStandartFormat(taskCreation)}`,
            label: taskLabels,
            text: taskText,
        }

        setTasks([...tasks, newTask])

        setTaskLabels([])
        setTaskText('')
        setTaskCreation(-1)
    }

    const editTask = (e: React.MouseEvent<HTMLDivElement>, task: TaskI) :void => {
        e.stopPropagation()
        
        setTaskCreation(-1)

        setTaskEdit(task.id)
        setTaskLabels(task.label)
        setTaskText(task.text)
    }

    const saveEditedTask = (e: React.MouseEvent<HTMLDivElement>) : void => {
        e.stopPropagation()
        
        const editedTasks: TaskI[] = [...tasks]
        const index = editedTasks.findIndex(e => e.id === taskEdit)

        editedTasks[index].label = taskLabels
        editedTasks[index].text = taskText
        setTasks([...editedTasks])
        
        setTaskLabels([])
        setTaskText('')
        setTaskEdit(-1)
    }


    return (
        <DayCon 
            className={`calendar__body__day${day + 1 == metaData.currentDay && metaData.currentMonth == metaData.selectedMonth && metaData.currentYear == metaData.selectedYear ? ' current' : ''}`}
            onDragOver={ev => handleDragOver(ev)}
            onDragLeave={ev => handleDragLeave(ev)}
            onDrop={ev => handleDrop(ev, day)}
        >
            <div className="calendar__body__day__title">
                <div className="calendar__body__day__title__date">{day + 1}</div>

                {
                    dayTasks.length ? 
                        <div className="calendar__body__day__title__numOfCards">{`${dayTasks.length} card${dayTasks.length === 1 ? '' : 's'}`}</div>
                        : <></>
                }
            </div>

            {
                dayHolidays.map(e => 
                    <div className="calendar__body__day__card holiday">
                        <div className="calendar__body__day__card__text">{e.name}</div>
                    </div>
                )
            }

            {
                dayTasks.map(e => 
                    taskEdit !== e.id ? 
                        <div 
                            className="calendar__body__day__card"
                            onDragStart={ev => handleDragStart(ev, e)}
                            onDragEnd={ev => handleDragEnd(ev)}
                            draggable
                        >
                            <div className="calendar__body__day__card__colors">
                                {
                                    e.label.map(el =>
                                        <div className="calendar__body__day__card__colors-single" style={{background: el.color}} />    
                                    )
                                }
                            </div>

                            <div className="calendar__body__day__card__text">
                                {e.text}
                                <div className="edit" onClick={ev => editTask(ev, e)}>&#128393;</div>
                            </div>
                        </div>
                        :
                        <div className="calendar__body__day__card">
                            <Labels 
                                labels={labels} 
                                setLabels={setLabels} 
                                selectedLabes={taskLabels} 
                                setSelectedLabes={setTaskLabels} 
                                callback={handleChangeTaskLabel}
                            />
                            <div className="row">
                                <input type="text" value={taskText} onChange={e => setTaskText(e.target.value)} placeholder="Enter task text..." />
                                <div className="confirm" onClick={saveEditedTask}>&#10004;</div>
                            </div>
                        </div>
                )
            }

            {
                taskCreation === day ?
                    <div className="calendar__body__day__card">
                        <Labels 
                            labels={labels} 
                            setLabels={setLabels} 
                            selectedLabes={taskLabels} 
                            setSelectedLabes={setTaskLabels} 
                            callback={handleChangeTaskLabel}
                        />
                        <div className="row">
                            <input type="text" value={taskText} onChange={e => setTaskText(e.target.value)} placeholder="Enter task text..." />
                            <div className="confirm" onClick={addTask}>&#10004;</div>
                        </div>
                    </div>
                    : <></>
            }

            {
                taskCreation !== day ?
                    <div className="calendar__body__day__card add" onClick={() => handleCreateTask(day)}></div>
                    : <></>
            }
        </DayCon>
    )
}

export default Day