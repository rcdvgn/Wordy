import { useEffect, useState } from 'react';
import { SettingsIcon, ArrowLeftIcon, ArrowRightIcon, FlameIcon } from './Icons.jsx';
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function Settings({ settingsData, setSettingsData, setShowSettings, nextGame }){

    const nextOption = (direction, target) => {
        if(settingsData[target].options[settingsData[target].tempOption + direction]){
            let updatedSettingsData = [...settingsData];
            updatedSettingsData[target].tempOption += direction;
            setSettingsData(updatedSettingsData);
        }
    }

    const Setting = () => {
        return (
            settingsData.map((currentSetting, i) => {
                return (
                    <div key={i} className="settingsSetting">
                        <span className="settingsOptionsTitle">{currentSetting.settingTitle}</span>
                        <div className="settingsOptionsWrapper">
                            <div className="settingsOptions" style={{transform: `translateX(calc(-${currentSetting.tempOption} * 100%))`}}>
                                {currentSetting.options.map((currentSettingOption, j) => {
                                    return (
                                        <div key={j} className="settingsOption">
                                            {i === 0 
                                                ? <span className={`flagIcon fi fi-${currentSettingOption.code}`}></span>
                                                : <FlameIcon className="settingsFlameIcon" color={currentSettingOption.color} />
                                            }
                                            {currentSettingOption.optionTitle}
                                        </div>
                                    )
                                })}
                            </div>
                            <ArrowLeftIcon className="arrowIcon arrowLeft" nextOption={nextOption} target={i} />
                            <ArrowRightIcon className="arrowIcon arrowRight" nextOption={nextOption} target={i} />
                        </div>
                    </div>
                )
            })
        )
    }

    const saveSettings = () => {
        if ((settingsData[0].option !== settingsData[0].tempOption) || settingsData[1].option !== settingsData[1].tempOption){
            let updatedSettingsData = [...settingsData];
            updatedSettingsData[0].option = updatedSettingsData[0].tempOption;
            updatedSettingsData[1].option = updatedSettingsData[1].tempOption;
            setSettingsData(updatedSettingsData);
        }
        
        setShowSettings(false);
        nextGame();
    }
    const cancelSettings = () => {
        if ((settingsData[0].option !== settingsData[0].tempOption) || settingsData[1].option !== settingsData[1].tempOption){
            let updatedSettingsData = [...settingsData];
            updatedSettingsData[0].tempOption = updatedSettingsData[0].option;
            updatedSettingsData[1].tempOption = updatedSettingsData[1].option;
            setSettingsData(updatedSettingsData);
        }
        setShowSettings(false);
    }

    return (
        <div className="blackBackground">
            <div className="boxWrapper">
                <span className="boxTitle settingsBoxTitle">Settings</span>
                <Setting />                
                <div className="boxButtons">
                    <button onClick={cancelSettings} className="btn btn-2">Cancel</button>
                    <button onClick={saveSettings} className="btn btn-1">Save changes</button>
                </div>
            </div>
        </div>
    )
}