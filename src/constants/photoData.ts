type Medium = 'graphite'|'colored-pencil'|'acrylic'|'marker'|'watercolor'
type Subject = 'landscape'|'still-life'|'animal'

export interface PhotoDataType {
    path: string
    title: string
    date: string
    medium: Medium[]
    subject: Subject
}
const photoData: PhotoDataType[] = [
    {
        path: '2023_11_22-Zeus.jpg',
        date: '11/22/2023',
        medium: ['colored-pencil'],
        subject: 'animal',
        title: 'Zeus'
    },
    {
        path: '2023_08_09-Shrine.jpg',
        date: '08/09/2023',
        medium: ['colored-pencil'],
        subject: 'landscape',
        title: 'Shrine'
    },
    {
        path: '2023_10_16-bokoblin.jpg',
        date: '10/16/2023',
        medium: ['colored-pencil'],
        subject: 'animal',
        title: 'Blue Bokoblin'
    },
    {
        path: '2023_08_17-wineglass.jpg',
        date: '08/17/2023',
        medium: ['colored-pencil'],
        subject: 'still-life',
        title: 'Wine Glass'
    },
    {
        path: '2023_10_10-Speckles.jpg',
        date: '10/10/2023',
        medium: ['colored-pencil'],
        subject: 'animal',
        title: 'Speckles'
    }
]

export default photoData;
