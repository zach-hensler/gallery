import Zeus from '../assets/photos/2023_11_22-Zeus.jpg';
import Shrine from '../assets/photos/2023_08_09-Shrine.jpg';
import WineGlass from '../assets/photos/2023_08_17-wineglass.jpg';
import Speckles from '../assets/photos/2023_10_10-Speckles.jpg';
import Bokoblin from '../assets/photos/2023_10_16-bokoblin.jpg';
import Leaves from '../assets/photos/2022_08_07-leaves.jpg';
import RyansRock from '../assets/photos/2022_08_20-ryans-rock.jpg';
import LizardTime from '../assets/photos/2023_05_23-its-lizard-time.jpg';
import ColorfulKoroks from '../assets/photos/2023_07_01-koroks.jpg';
import Chipmunk from '../assets/photos/2023_07_09-chipmunk.jpg';
import SleepyMen from '../assets/photos/2023_07_19-sleepy-men.jpg';
import SurprisedPikachu from '../assets/photos/2023_11_23-Surprised-Pikachu.jpg';
import SunsetLandscape from '../assets/photos/2021_11_19-sunset-landscape.jpg';
import WinterLandscape from '../assets/photos/2022_01_15-winter-landscape.jpg';
import FallCreek from '../assets/photos/2022_02_19-fall-creek.jpg';
import MountainLandscape from '../assets/photos/2022_06_18-mountain-landscape.jpg';
import PicturedRocks from '../assets/photos/2022_11_21-pictured-rocks.jpg';
import SunsetClouds from '../assets/photos/2023_09_17-sunset-clouds.jpg';
import PathThroughForest from '../assets/photos/2023_11_22-forest.jpg';
import BuggingOut from '../assets/photos/2023_12_13-bugging-out.jpg';
import PurpleRose from '../assets/photos/2024_01_03-purple-rose.jpg';
import Bonsai from '../assets/photos/2024_01_15-bonsai.jpg';
import Magikarp from '../assets/photos/2024_01_20-Magikarp-fishtank.jpg';
import BigSpeckles from '../assets/photos/2024_01_31-Big-Speckles.jpg';
import ColoredCats from '../assets/photos/2024_02_11-colored-cats.jpg';
import ChillSpeckles from '../assets/photos/2024_02_25-Chill-Speckles.jpg';
import GraphitePigeon from '../assets/photos/2024_04_01_pigeon.jpg';
import Beeeeees from '../assets/photos/2024_05_04-beeeeees.jpg';
import LightningBug from '../assets/photos/2024_05_11-lightnin-bug.jpg';
import ShadowedCave from '../assets/photos/2024_05_18-cave.jpg';
import Chaos from '../assets/photos/2024_05_25-chaos.jpg'

export const Mediums = ['graphite', 'colored-pencil', 'marker', 'acrylic', 'watercolor'] as const
export type MediumsType = typeof Mediums[number]

export const Subjects = ['landscape', 'still-life', 'animal', 'character', 'scene', 'abstract'] as const
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
    },
    {
        image: Beeeeees,
        date: '05/04/2024',
        medium: ['watercolor', 'colored-pencil'],
        subject: 'scene',
        title: 'The Bees Knees'
    },
    {
        image: LightningBug,
        date: '05/11/2024',
        medium: ['watercolor'],
        subject: 'scene',
        title: 'Illuminated'
    },
    {
        image: ShadowedCave,
        date: "05/18/2024",
        medium: ['watercolor'],
        subject: 'scene',
        title: 'A Lone Light'
    },
    {
        image: Chaos,
        date: "05/25/2024",
        medium: ['watercolor'],
        subject: 'abstract',
        title: 'Chaos'
    }
]

export default photoData;
