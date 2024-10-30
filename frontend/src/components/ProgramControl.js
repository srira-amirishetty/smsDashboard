import React from 'react';
import apiService from '../services/apiService';

function ProgramControl() {
    const handleControl = async (action) => {
        await apiService.controlSession(action);
        alert(`Session ${action}ed successfully.`);
    };

    return (
        <div className="program-control">
            <h1>Program Control</h1>
            <div className="control-buttons">
                <button onClick={() => handleControl('start')}>Start Session</button>
                <button onClick={() => handleControl('stop')}>Stop Session</button>
                <button onClick={() => handleControl('restart')}>Restart Session</button>
            </div>
        </div>
    );
}

export default ProgramControl;
