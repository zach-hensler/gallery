import {
    Zeus,
    Bokoblin,
    Speckles,
    Shrine,
    WineGlass,
    Leaves,
    RyansRock,
    LizardTime,
    ColorfulKoroks,
    Chipmunk,
    SleepyMen,
    SurprisedPikachu,
    SunsetLandscape,
    WinterLandscape,
    FallCreek,
    MountainLandscape,
    PicturedRocks,
    SunsetClouds,
    PathThroughForest,
    BuggingOut,
    PurpleRose,
    Bonsai,
    Magikarp,
    BigSpeckles,
    ColoredCats,
    ChillSpeckles, GraphitePigeon
} from "../assets/photos";

export const Mediums = ['graphite', 'colored-pencil', 'marker', 'acrylic', 'watercolor'] as const
export type MediumsType = typeof Mediums[number]

export const Subjects = ['landscape', 'still-life', 'animal', 'character', 'scene'] as const
export type SubjectsType = typeof Subjects[number]

export interface PhotoDataType {
    image: string
    title: string
    date: string
    medium: MediumsType[]
    subject: SubjectsType
    description?: string
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
        subject: 'character',
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
        title: 'Ryan\'s Rock',
        description: 'Ryan and Mom, scaling rocks while hiking in Colorado'
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
        subject: 'character',
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
        subject: 'character',
        title: 'Surprised Pikachu'
    },
    {
        image: SunsetLandscape,
        date: '11/19/2021',
        medium: ['acrylic'],
        subject: 'landscape',
        title: 'Sunset over Hills',
        description: 'Inspired by Bob Ross'
    },
    {
        image: WinterLandscape,
        date: '01/15/2022',
        medium: ['acrylic'],
        subject: 'landscape',
        title: 'Winter Creek',
        description: 'Inspired by Bob Ross'
    },
    {
        image: FallCreek,
        date: '02/19/2022',
        medium: ['acrylic'],
        subject: 'landscape',
        title: 'Covered Bridge over a Creek in Fall',
        description: 'Inspired by Bob Ross'
    },
    {
        image: MountainLandscape,
        date: '06/18/2022',
        medium: ['acrylic'],
        subject: 'landscape',
        title: 'A Mountain between Pines',
        description: 'Inspired by Bob Ross'
    },
    {
        image: PicturedRocks,
        date: '11/21/2022',
        medium: ['acrylic'],
        subject: 'landscape',
        title: 'A Lakeside view of Pictured Rocks'
    },
    {
        image: SunsetClouds,
        date: '09/17/2023',
        medium: ['acrylic'],
        subject: 'landscape',
        title: 'Evening Clouds',
        description: 'Inspired by some incredible clouds that I saw at an outdoor concert.'
    },
    {
        image: PathThroughForest,
        date: '11/22/2023',
        medium: ['colored-pencil'],
        subject: 'landscape',
        title: 'A Path through the Woods'
    },
    {
        image: BuggingOut,
        date: '12/13/2023',
        medium: ['colored-pencil'],
        subject: 'scene',
        title: 'Bugging Out'
    },
    {
        image: PurpleRose,
        date: '01/03/2024',
        medium: ['marker'],
        subject: 'still-life',
        title: 'A Purple Rose'
    },
    {
        image: Bonsai,
        date: '01/15/2024',
        medium: ['marker'],
        subject: 'still-life',
        title: 'Bonsai'
    },
    {
        image: Magikarp,
        date: '01/20/2024',
        medium: ['marker'],
        subject: 'scene',
        title: 'Aquarium con Magikarp'
    },
    {
        image: BigSpeckles,
        date: '01/31/2024',
        medium: ['marker'],
        subject: 'animal',
        title: 'Large Lizard Lounging'
    },
    {
        image: ColoredCats,
        date: '02/11/2024',
        medium: ['acrylic'],
        subject: 'animal',
        title: 'Colored Cats!',
        description: 'Pictured are my two cats: Ivy and Zeus. The idea was initially inspired by the works of Andy Warhol, and ' +
            'it continued to evolve into it\'s current state over several months of practice and preparation.'
    },
    {
        image: ChillSpeckles,
        date: '02/25/2024',
        medium: ['watercolor'],
        subject: 'animal',
        title: 'Speckles in Watercolor'
    },
    {
        image: GraphitePigeon,
        date: '04/01/2024',
        medium: ['graphite'],
        subject: 'animal',
        title: 'A White Dove is a Pigeon'
    }
]

export default photoData;
