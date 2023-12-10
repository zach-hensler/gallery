import {describe, expect, test} from 'vitest'
import {checkPhotoForFilters, comparePhotoByDate} from "../src/views/Gallery";
import {PhotoDataType} from "../src/constants/photoData";

describe('comparePhotoByDate function from views/Gallery', () => {
    const basePhoto: PhotoDataType = {
        image: '',
        title: '',
        date: '',
        medium: [],
        subject: 'landscape'
    }
    const photos: PhotoDataType[] = [
        { ...basePhoto, date: '10/10/2020', title: 'Second' },
        { ...basePhoto, date: '09/10/2021', title: 'Fourth' },
        { ...basePhoto, date: '1/1/2021', title: 'Third' },
        { ...basePhoto, date: '05/10/2020', title: 'First' }
    ];
    test('should sort by newest', () => {
        const sorted = photos.sort(comparePhotoByDate('newest'));
        expect(sorted[3].title).toBe('First');
        expect(sorted[2].title).toBe('Second');
        expect(sorted[1].title).toBe('Third');
        expect(sorted[0].title).toBe('Fourth');
    })
    test('should sort by oldest', () => {
        const sorted = photos.sort(comparePhotoByDate('oldest'));
        expect(sorted[0].title).toBe('First');
        expect(sorted[1].title).toBe('Second');
        expect(sorted[2].title).toBe('Third');
        expect(sorted[3].title).toBe('Fourth');
    })
})

describe('checkPhotoForFilters function from views/Gallery', () => {
    const photos: PhotoDataType[] = [
        {
            image: '',
            title: '',
            date: '',
            medium: ['colored-pencil'],
            subject: 'landscape'
        },
        {
            image: '',
            title: '',
            date: '',
            medium: ['colored-pencil', 'marker'],
            subject: 'animal'
        },
    ]
    test('should keep photos when no filters are applied', () => {
        expect(photos.filter(checkPhotoForFilters([], [])).length).toBe(2)
    })
    test('should keep photos containing subject filters', () => {
        expect(photos.filter(checkPhotoForFilters([], ['landscape', 'animal'])).length).toBe(2)
    })
    test('should filter photos not containing subject filters', () => {
        const filteredPhotos = photos.filter(checkPhotoForFilters([], ['landscape']))
        expect(filteredPhotos.length).toBe(1);
        expect(filteredPhotos[0].subject).toBe('landscape');
    })
    test('should keep photos containing medium filters', () => {
        expect(photos.filter(checkPhotoForFilters(['colored-pencil'], [])).length).toBe(2)
    })
    test('should filter photos not containing medium filters', () => {
        const filteredPhotos = photos.filter(checkPhotoForFilters(['marker'], []))
        expect(filteredPhotos.length).toBe(1);
        expect(filteredPhotos[0].medium).toContain('marker');
    })
})
