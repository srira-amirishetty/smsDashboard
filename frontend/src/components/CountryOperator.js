import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

function CountryOperator() {
    const [operators, setOperators] = useState([]);
    const [country, setCountry] = useState('');
    const [operator, setOperator] = useState('');
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        fetchOperators();
    }, []);

    const fetchOperators = async () => {
        const data = await apiService.getCountryOperators();
        setOperators(data);
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        if (editing) {
            await apiService.updateCountryOperator(editing._id, { country, operator });
            setEditing(null);
        } else {
            await apiService.addCountryOperator({ country, operator });
        }
        setCountry('');
        setOperator('');
        fetchOperators();
    };

    const handleEdit = (operator) => {
        setEditing(operator);
        setCountry(operator.country);
        setOperator(operator.operator);
    };

    const handleDelete = async (id) => {
        await apiService.deleteCountryOperator(id);
        fetchOperators();
    };

    return (
        <div className="country-operator">
            <h2>{editing ? 'Edit' : 'Add'} Country-Operator</h2>
            <form onSubmit={handleAddOrUpdate}>
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Operator"
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                    required
                />
                <button type="submit">{editing ? 'Update' : 'Add'} Country-Operator</button>
            </form>
            <h2>Country-Operator List</h2>
            <ul>
                {operators.map((op) => (
                    <li key={op._id}>
                        {op.country} - {op.operator}
                        <button onClick={() => handleEdit(op)}>Edit</button>
                        <button onClick={() => handleDelete(op._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CountryOperator;
