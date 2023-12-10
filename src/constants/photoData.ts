import {
    Zeus,
    Bokoblin,
    Speckles,
    Shrine,
    WineGlass,
    Leaves,
    RyansRock,
    LizardTime,
    ColorfulKoroks, Chipmunk, SleepyMen, SurprisedPikachu
} from "../assets/photos";

export const Mediums = ['graphite', 'colored-pencil', 'marker'] as const
export type MediumsType = typeof Mediums[number]

export const Subjects = ['landscape', 'still-life', 'animal', 'scene'] as const
export type SubjectsType = typeof Subjects[number]

export interface PhotoDataType {
    image: string
    title: string
    date: string
    medium: MediumsType[]
    subject: SubjectsType
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
    },
    {
        image: Leaves,
        date: '08/07/2022',
        medium: ['graphite'],
        subject: 'still-life',
        title: 'Leaves in the Park'
    },
    {
        image: RyansRock,
        date: '08/20/2022',
        medium: ['graphite'],
        subject: 'scene',
        title: 'Ryan\'s Rock'
    },
    {
        image: LizardTime,
        date: '05/23/23',
        medium: ['colored-pencil'],
        subject: 'scene',
        title: 'It\'s Lizard Time'
    },
    {
        image: ColorfulKoroks,
        date: '07/01/2023',
        medium: ['colored-pencil'],
        subject: 'animal',
        title: 'Colorful Koroks'
    },
    {
        image: Chipmunk,
        date: '07/09/2023',
        medium: ['graphite'],
        subject: 'animal',
        title: 'Chipmunk'
    },
    {
        image: SleepyMen,
        date: '07/19/2023',
        medium: ['colored-pencil'],
        subject: 'scene',
        title: 'Sleepy Men around the Fire'
    },
    {
        image: SurprisedPikachu,
        date: '11/23/2023',
        medium: ['marker'],
        subject: 'animal',
        title: 'Surprised Pikachu'
    }
]

export default photoData;
