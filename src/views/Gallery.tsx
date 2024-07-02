import {FunctionalComponent} from "preact";
import {useCallback, useMemo, useState} from "preact/hooks";

import photoData, {Mediums, MediumsType, PhotoDataType, Subjects, SubjectsType} from "../constants/photoData.ts";
import FilterIcon from '../assets/icons/FilterIcon.svg';
import CloseIcon from '../assets/icons/CloseIcon.svg';
import ArrowForward from '../assets/icons/ArrowForward.svg';
import ArrowBack from '../assets/icons/ArrowBack.svg';
import {useSwipeGestures} from "../hooks/useSwipeGestures.ts";
import {Image} from "../components/Image.tsx";

/**
 * Curried function for sorting photos by date
 * @param sortDirection - Direction to sort the photos, either newest or oldest
 */
export const comparePhotoByDate = (sortDirection: GalleryState['sortDirection']) => (a: PhotoDataType, b: PhotoDataType): number => sortDirection === 'newest'
    ? new Date(b.date).valueOf() - new Date(a.date).valueOf()
    : new Date(a.date).valueOf() - new Date(b.date).valueOf()

/**
 * Curried function for filtering photos, filters are "or'ed" together within a category
 * @param mediumFilters - Filters to apply based on the photo's medium
 * @param subjectFilters - Filters to apply based on the photo's subject
 */
export const checkPhotoForFilters =
    (mediumFilters: GalleryState['mediumFilters'], subjectFilters: GalleryState['subjectFilters']) =>
        (photo: PhotoDataType): boolean =>
            !!(
                (!subjectFilters.length || subjectFilters.find(sf => photo.subject.includes(sf))) &&
                (!mediumFilters.length || mediumFilters.find(medium => photo.medium.includes(medium)))
            )

/**
 * When a subject is clicked, it will toggle its status as a filter
 * Ex: If it's applied, it'll turn off.  If it's off, it'll apply
 * @param clickedSubject - The clickedSubject type that was clicked on
 * @param subjectFilters - The currently applied subject filters
 * @param updateState - A callback function to handle the change
 */
const onClickSubject = (
    clickedSubject: SubjectsType,
    subjectFilters: GalleryState['subjectFilters'],
    updateState: (newState: Partial<GalleryState>) => void
) => updateState({
    subjectFilters: subjectFilters.includes(clickedSubject)
        ? subjectFilters.filter(s => s !== clickedSubject)
        : [ ...subjectFilters, clickedSubject ]
})

/**
 * When a medium is clicked, it will toggle its status as a filter
 * Ex: If it's applied, it'll turn off.  If it's off, it'll apply
 * @param clickedMedium - The medium type that was clicked on
 * @param mediumFilters - The currently applied medium filters
 * @param updateState - A callback function to handle the change
 */
const onClickMedium = (
    clickedMedium: MediumsType,
    mediumFilters: GalleryState['mediumFilters'],
    updateState: (newState: Partial<GalleryState>) => void
) => updateState({
    mediumFilters: mediumFilters.includes(clickedMedium)
        ? mediumFilters.filter(s => s !== clickedMedium)
        : [ ...mediumFilters, clickedMedium ]
})

interface GalleryState {
    showSortFilterModal: boolean
    selectedPhoto: PhotoDataType|null
    sortDirection: 'newest'|'oldest',
    mediumFilters: MediumsType[]
    subjectFilters: SubjectsType[]
}

export const Gallery: FunctionalComponent = () => {
    const [state, setState] = useState<GalleryState>({
        showSortFilterModal: false,
        selectedPhoto: null,
        sortDirection: 'newest',
        mediumFilters: [],
        subjectFilters: []
    });

    const filteredAndSortedPhotos = useMemo(() =>
            photoData
                .filter(checkPhotoForFilters(state.mediumFilters, state.subjectFilters))
                .sort(comparePhotoByDate(state.sortDirection)),
        [state.mediumFilters, state.subjectFilters, state.sortDirection])

    const updateState = useCallback((newState: Partial<GalleryState>) =>
        setState(prevState => ({...prevState, ...newState})), []);

    const closeSelectedPhoto = () => updateState({selectedPhoto: null});

    const getIndexByPhoto = (searchPhoto: PhotoDataType) => filteredAndSortedPhotos.findIndex((p) => p.title === searchPhoto.title);

    const nextPhoto = useMemo(() => state.selectedPhoto
        ? filteredAndSortedPhotos[getIndexByPhoto(state.selectedPhoto) + 1]
        : null, [state.selectedPhoto]);

    const previousPhoto = useMemo(() => state.selectedPhoto
        ? filteredAndSortedPhotos[getIndexByPhoto(state.selectedPhoto) - 1]
        : null, [state.selectedPhoto]);

    useSwipeGestures({
        handleDownSwipe: closeSelectedPhoto,
        handleUpSwipe: closeSelectedPhoto,
        handleLeftSwipe: () => updateState({selectedPhoto: nextPhoto}),
        handleRightSwipe: () => updateState({selectedPhoto: previousPhoto})
    });

    const renderPhotoCards = (photos: PhotoDataType[]) => photos
        .map(photo =>
            <div class="card column is-one-third my-4">
                <header class="card-header is-flex-direction-column">
                    <p class="card-header-title is-centered">{photo.title} - {photo.date}</p>
                    <div>
                        {photo.medium.map(medium =>
                            <span className="tag is-primary is-light m-2">{medium}</span>)}
                    </div>
                </header>
                <div class="card-image" onClick={() => updateState({selectedPhoto: photo})}>
                    <Image src={photo.image} alt={photo.title}/>
                </div>
                <div class="card-content">
                    {photo.description ? <p class="content">{photo?.description}</p> : <></>}
                    <div class="container has-text-centered">
                        <button class="button is-info is-light" onClick={() => updateState({selectedPhoto: photo})}>
                            See Full Image
                        </button>
                    </div>
                </div>
            </div>)

    const renderSelectedPhotoModal = () => state.selectedPhoto
        ? <div class={`modal ${state.selectedPhoto ? 'is-active' : ''}`}>
            <div class="modal-background" onClick={closeSelectedPhoto}></div>
            <div class="modal-content">
                <div class={`card`}>
                    <header class="card-header">
                        <p class="card-header-title">{state.selectedPhoto.title} - {state.selectedPhoto.date}</p>
                        <button class="card-header-icon">
                            <span className="icon">
                                <img
                                    src={CloseIcon}
                                    alt="Close Icon"
                                    onClick={closeSelectedPhoto}/>
                            </span>
                        </button>
                    </header>
                    <div class="card-image">
                        <div class="left-navigation-container"
                             onClick={() => updateState({selectedPhoto: previousPhoto})}>
                            <img
                                src={ArrowBack}
                                alt="Show Previous Photo"
                                class="navigation-arrow-icon"
                            />
                        </div>
                        <div class="right-navigation-container" onClick={() => updateState({selectedPhoto: nextPhoto})}>
                            <img
                                src={ArrowForward}
                                alt="Show Next Photo"
                                class="navigation-arrow-icon"
                            />
                        </div>
                        <img src={state.selectedPhoto.image} alt={state.selectedPhoto.title}/>
                    </div>
                </div>
            </div>
        </div>
        : <></>;

    const renderSortFilterModal = () =>
        <div class={`modal ${(state.showSortFilterModal && !state.selectedPhoto) ? 'is-active' : ''}`}>
            <div class="modal-background" onClick={() => updateState({showSortFilterModal: false})}></div>
            <div class="modal-content">
                <div class="card">
                    <div class="card-header is-flex is-justify-content-space-around is-align-items-center">
                        <p class="card-header-title">Sort and Filter</p>
                        <button class="card-header-icon">
                            <span className="icon">
                                <img
                                    src={CloseIcon}
                                    alt="Close Icon"
                                    onClick={() => updateState({showSortFilterModal: false})}/>
                            </span>
                        </button>
                    </div>
                    <div class="card-content has-text-centered">
                        <div class="field">
                            <label class="label">Sort</label>
                            <div class="control">
                                <label class="radio">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={state.sortDirection === "newest"}
                                        onClick={() => updateState({sortDirection: 'newest'})}
                                    />
                                    &nbsp;Newest
                                </label>
                                <label class="radio">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={state.sortDirection === "oldest"}
                                        onClick={() => updateState({sortDirection: 'oldest'})}
                                    />
                                    &nbsp;Oldest
                                </label>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Filter Subject</label>
                            <div class="control">
                                <label class="checkbox">
                                    {Subjects.map(subject =>
                                        <>
                                            <label class="checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={state.subjectFilters.includes(subject)}
                                                    onClick={() => onClickSubject(subject, state.subjectFilters, updateState)}
                                                />
                                                &nbsp;{subject}
                                            </label>
                                            <br/>
                                        </>)}
                                </label>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Filter Medium</label>
                            <div class="control">
                                {Mediums.map(medium =>
                                    <>
                                        <label class="checkbox">
                                            <input
                                                type="checkbox"
                                                checked={state.mediumFilters.includes(medium)}
                                                onClick={() => onClickMedium(medium, state.mediumFilters, updateState)}
                                            />
                                            &nbsp;{medium}
                                        </label>
                                        <br/>
                                    </>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    const deletableTag = (text: string, handleDelete: () => void) =>
        <span className="tag is-light is-info m-2 is-clickable" onClick={handleDelete}>
            {text}
            <button class="delete is-small" />
        </span>

    return (
        <>
            <div class="title mt-3 ml-3 is-2">An Art Gallery</div>
            <div class="subtitle ml-4">by: Zach Hensler</div>
            <button class="button is-primary is-light" onClick={() => updateState({showSortFilterModal: true})}>
                <figure class="image is-32x32">
                    <img src={FilterIcon} alt="Icon to open filter/sort menu"/>
                </figure>
                <span className="content">Sort and Filter</span>
            </button>
            <span
                className="tag is-light is-info m-2 is-clickable"
                onClick={() => updateState({sortDirection: state.sortDirection === 'newest' ? 'oldest' : 'newest'})}
            >{state.sortDirection}</span>
            {state.mediumFilters.map(m => deletableTag(m, () => onClickMedium(m, state.mediumFilters, updateState)))}
            {state.subjectFilters.map(s => deletableTag(s, () => onClickSubject(s, state.subjectFilters, updateState)))}
            <div class="columns is-multiline is-variable is-6 m-auto">
                {renderPhotoCards(filteredAndSortedPhotos)}
            </div>
            {renderSelectedPhotoModal()}
            {renderSortFilterModal()}
        </>
    )
}
