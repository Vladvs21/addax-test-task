import { FC, useState } from 'react'
import { labelsArray } from '../data'
import { ColorT, FilterI, LabelI } from '../interfaces'
import { LabelsCon } from './styles/Label'

interface LabelsPropsI {
    labels: LabelI[],
    setLabels: Function, 
    selectedLabes: FilterI | LabelI[],
    setSelectedLabes: Function,
    callback?: Function,
    createEdit?: boolean
}

const Labels:FC<LabelsPropsI> = ({labels, setLabels, selectedLabes, setSelectedLabes, callback = null, createEdit = false}) => {

    const [labelCreation, setLabelCreation] = useState<boolean>(false)
    const [labelEdit, setLabelEdit] = useState<number>(-1)
    const [labelColor, setLabelColor] = useState<ColorT>('#000000')
    const [labelText, setLabelText] = useState<string>('')



    // Funtions     -     Tasks filtratio

    const handleChangeFilterLabel = (label: LabelI): void => {
        if('label' in selectedLabes) {
            const newFilter = {...selectedLabes}

            if(newFilter.label.findIndex(el => el.id === label.id) != -1) {
                newFilter.label = newFilter.label.filter(el => el.id !== label.id)
            } else {
                newFilter.label = [...newFilter.label, label]
            }

            setSelectedLabes(newFilter)
        } else {
            let newFilter = {...selectedLabes}

            if(newFilter.findIndex(el => el.id === label.id) != -1) {
                newFilter = newFilter.filter(el => el.id !== label.id)
            } else {
                newFilter = [...newFilter, label]
            }

            setSelectedLabes(newFilter)
        }
    }

    // Funtions     -     Label create/save after creation/edit/save after editing

    const handleLabelCreation = () : void => {
        setLabelColor('#000000')
        setLabelText('')
        setLabelEdit(-1)

        setLabelCreation(true)
    }

    const addLabel = () : void => {
        const newLabel: LabelI = {
            id: Math.max(...labelsArray.map(el => el.id)) + 1,
            color: labelColor,
            text: labelText,
        }

        setLabels([...labels, newLabel])

        setLabelColor('#000000')
        setLabelText('')
        setLabelCreation(false)
    }

    const editLabel = (e: React.MouseEvent<HTMLDivElement>, label: LabelI) :void => {
        e.stopPropagation()
        
        setLabelCreation(false)

        setLabelEdit(label.id)
        setLabelColor(label.color)
        setLabelText(label.text)
    }

    const saveEditedLabel = (e: React.MouseEvent<HTMLDivElement>) : void => {
        e.stopPropagation()
        
        const editedLabel = {
            id: labelEdit,
            text: labelText,
            color: labelColor
        }
        setLabels([...labels.filter(el => el.id != labelEdit), editedLabel].sort((a:LabelI, b:LabelI) => a.id - b.id))
        
        setLabelColor('#000000')
        setLabelText('')
        setLabelEdit(-1)
    }

    return (
        <LabelsCon>
            <button className="uk-button uk-button-default calendar__header__left__colorButton" type="button">
                {
                    'label' in selectedLabes ? 
                        selectedLabes.label.length ?
                            selectedLabes.label.map(el => 
                                <div className="calendar__header__left__colorButton__color" style={{background: el.color}} />
                            )
                            : 'Labels'
                        :
                        selectedLabes.length ?
                            selectedLabes.map(el => 
                                <div className="calendar__header__left__colorButton__color" style={{background: el.color}} />
                            )
                            : 'Labels'
                }
            </button>
            <div uk-dropdown="">
                {
                    labels.map(el => 
                        labelEdit != el.id  ? 
                            <div className={`calendar__header__left__colorContainer${'label' in selectedLabes ? selectedLabes.label.findIndex(e => e.id === el.id) != -1 ? ' selected' : '' : selectedLabes.findIndex(e => e.id === el.id) != -1 ? ' selected' : ''}`} onClick={() => {if(callback !== null) {callback(el)} else handleChangeFilterLabel(el)}}>
                                <div className={`calendar__header__left__colorContainer__color`} style={{background: el.color, outlineColor: el.color}} />
                                {el.text}
                                {
                                    createEdit ?
                                        <div className="edit" onClick={e => editLabel(e, el)}>&#128393;</div>
                                        : <></>
                                }
                            </div>
                            : 
                            <div className="calendar__header__left__colorContainer create">
                                <div className="colorInputContainer" style={{background: labelColor}}>
                                    <input type="color" value={labelColor} onChange={e => setLabelColor(e.target.value as ColorT)} />
                                </div>
                                <input type="text" value={labelText} onChange={e => setLabelText(e.target.value)} />
                                <div className="confirm" onClick={saveEditedLabel}>&#10004;</div>
                            </div>
                    )
                }
                {
                    labelCreation ? 
                        <div className="calendar__header__left__colorContainer create">
                            <div className="colorInputContainer" style={{background: labelColor}}>
                                <input type="color" value={labelColor} onChange={e => setLabelColor(e.target.value as ColorT)} />
                            </div>
                            <input type="text" value={labelText} onChange={e => setLabelText(e.target.value)} />
                            <div className="confirm" onClick={addLabel}>&#10004;</div>
                        </div>
                        : <></>
                }
                {
                    !labelCreation && createEdit ? 
                        <div className="calendar__header__left__colorContainer add" onClick={() => handleLabelCreation()} />
                        : <></>
                }
            </div>
        </LabelsCon>
    )
}

export default Labels