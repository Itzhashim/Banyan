import React from 'react';
import '../styles/filters.css';

const TableFilters = ({ 
    filters, 
    setFilters, 
    sortOptions, 
    onSort,
    searchFields = ['name', 'fileNumber']
}) => {
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = (e) => {
        const { value } = e.target;
        setFilters(prev => ({
            ...prev,
            searchTerm: value
        }));
    };

    const handleDateRangeChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            dateRange: {
                ...prev.dateRange,
                [name]: value
            }
        }));
    };

    return (
        <div className="filters-container">
            <div className="search-box">
                <input
                    type="text"
                    placeholder={`Search by ${searchFields.join(' or ')}...`}
                    value={filters.searchTerm || ''}
                    onChange={handleSearch}
                    className="search-input"
                />
            </div>

            <div className="filters-group">
                {filters.status !== undefined && (
                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        className="filter-select"
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                )}

                {filters.type !== undefined && (
                    <select
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                        className="filter-select"
                    >
                        <option value="">All Types</option>
                        <option value="IP">In-Patient</option>
                        <option value="OP">Out-Patient</option>
                    </select>
                )}

                <div className="date-range">
                    <input
                        type="date"
                        name="startDate"
                        value={filters.dateRange?.startDate || ''}
                        onChange={handleDateRangeChange}
                        className="date-input"
                    />
                    <span>to</span>
                    <input
                        type="date"
                        name="endDate"
                        value={filters.dateRange?.endDate || ''}
                        onChange={handleDateRangeChange}
                        className="date-input"
                    />
                </div>

                {sortOptions && (
                    <select
                        name="sort"
                        value={filters.sort || ''}
                        onChange={(e) => onSort(e.target.value)}
                        className="sort-select"
                    >
                        <option value="">Sort by...</option>
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        </div>
    );
};

export default TableFilters; 