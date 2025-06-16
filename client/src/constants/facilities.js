export const FACILITIES = [
    'adyar',
    'mogappair',
    'anna nagar',
    'nungambakkam',
    'guindy',
    'nanganallur',
    'tambaram',
    'ambattur',
    'koyambedu',
    'thiruvanmayur',
    'besant nagar',
    'kottivakkam',
    'padur',
    'perungudi',
    'red hills'
];

export const getFacilityDisplayName = (facility) => {
    return facility.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}; 