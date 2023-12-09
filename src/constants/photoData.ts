import Zeus from '../assets/2023_11_22-Zeus.jpg';
import Shrine from '../assets/2023_08_09-Shrine.jpg';
import WineGlass from '../assets/2023_08_17-wineglass.jpg';
import Speckles from '../assets/2023_10_10-Speckles.jpg';
import Bokoblin from '../assets/2023_10_16-bokoblin.jpg';

type Medium = 'graphite'|'colored-pencil'|'acrylic'|'marker'|'watercolor'
type Subject = 'landscape'|'still-life'|'animal'

export interface PhotoDataType {
    image: string
    title: string
    date: string
    medium: Medium[]
    subject: Subject
}
const photoData: PhotoDataType[] = [
    {
        image: Zeus,
        date: '11/22/2023',
        medium: ['colored-pencil'],
        subject: 'animal',
        title: 'Zeus'
    },
    {
        image: Shrine,
        date: '08/09/2023',
        medium: ['colored-pencil'],
        subject: 'landscape',
        title: 'Shrine'
    },
    {
        image: Bokoblin,
        date: '10/16/2023',
        medium: ['colored-pencil'],
        subject: 'animal',
        title: 'Blue Bokoblin'
    },
    {
        image: WineGlass,
        date: '08/17/2023',
        medium: ['colored-pencil'],
        subject: 'still-life',
        title: 'Wine Glass'
    },
    {
        image: Speckles,
        date: '10/10/2023',
        medium: ['colored-pencil'],
        subject: 'animal',
        title: 'Speckles'
    }
]

export default photoData;
