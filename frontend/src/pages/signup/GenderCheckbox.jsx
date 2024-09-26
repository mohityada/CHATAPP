import React from 'react'

const GenderCheckbox = ({onCheckboxChange, selectedGender}) => {
  return (
    <div className='flex'>
        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""} ` }>
                <span className='label-text text-black'>Male</span>
            </label>
            <input type='checkbox' className='checkbox border-slate-900' 
                checked = {selectedGender === 'male'}
                onChange={() => onCheckboxChange('male')}
            />

        </div>

        <div className='form-control'>
        <label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
            <span className='label-text text-black'>Female</span>
            </label>
            <input type='checkbox' className='checkbox border-slate-900' 
                checked = {selectedGender === 'female'}
                onChange={() => onCheckboxChange('female')}
            />
        </div>

        <div className='form-control'>
        <label className={`label gap-2 cursor-pointer ${selectedGender === "other" ? "selected" : ""}`}>
            <span className='label-text text-black'>Other</span>
            </label>
            <input type='checkbox' className='checkbox border-slate-900'
                checked = {selectedGender === 'other'}
                onChange={() => onCheckboxChange('other')}
            />
        </div>
        
    </div>
  )
}

export default GenderCheckbox
