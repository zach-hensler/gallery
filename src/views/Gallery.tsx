import {Component} from "preact";

import photoData, {Mediums, MediumsType, PhotoDataType, Subjects, SubjectsType} from "../constants/photoData.ts";
import FilterIcon from '../assets/icons/FilterIcon.svg';
import CloseIcon from '../assets/icons/CloseIcon.svg';

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
export const checkPhotoForFilters = (mediumFilters: GalleryState['mediumFilters'], subjectFilters: GalleryState['subjectFilters']) => (photo: PhotoDataType): boolean =>
    !!((!subjectFilters.length || subjectFilters.includes(photo.subject)) &&
    (!mediumFilters.length || mediumFilters.find(medium => photo.medium.includes(medium))))

interface GalleryState {
    showSortFilterModal: boolean
    selectedPhoto: PhotoDataType|null
    sortDirection: 'newest'|'oldest',
    mediumFilters: MediumsType[]
    subjectFilters: SubjectsType[]
}

export class Gallery extends Component<{},GalleryState> {
    state: GalleryState = {
        showSortFilterModal: false,
        selectedPhoto: null,
        sortDirection: 'newest',
        mediumFilters: [],
        subjectFilters: []
    }

    onClickSubject = (clickedSubject: SubjectsType) => this.setState({
        subjectFilters: this.state.subjectFilters.includes(clickedSubject)
            ? this.state.subjectFilters.filter(s => s !== clickedSubject)
            : [ ...this.state.subjectFilters, clickedSubject ]
    })

    onClickMedium = (clickedMedium: MediumsType) => this.setState({
        mediumFilters: this.state.mediumFilters.includes(clickedMedium)
            ? this.state.mediumFilters.filter(s => s !== clickedMedium)
            : [ ...this.state.mediumFilters, clickedMedium ]
    })

    renderPhotoData = () => photoData
        .filter(checkPhotoForFilters(this.state.mediumFilters, this.state.subjectFilters))
        .sort(comparePhotoByDate(this.state.sortDirection))
        .map(photo =>
            <div className="card column is-one-third my-4">
                <header className="card-header">
                    <p className="card-header-title">{photo.title}</p>
                </header>
                <div className="card-image" onClick={() => this.setState({selectedPhoto: photo})}>
                    <img src={photo.image} alt={photo.title}/>
                </div>
                <div className="card-content">
                    {photo.description ? <p className="content">{photo?.description}</p> : <></>}
                    <p className="content">Date: {photo.date}</p>
                    <p className="content">
                        Medium: {photo.medium.reduce<string>((prev, curr, idx) => idx > 0 ? `${prev}, ${curr}` : curr, '')}
                    </p>
                </div>
            </div>)

    renderSelectedPhotoModal = () => this.state.selectedPhoto
        ? <div class={`modal ${this.state.selectedPhoto ? 'is-active' : ''}`}>
            <div class="modal-background" onClick={() => this.setState({selectedPhoto: null})}></div>
            <div className="modal-content">
                <div className={`card`}>
                    <header className="card-header">
                        <p className="card-header-title">{this.state.selectedPhoto.title} - {this.state.selectedPhoto.date}</p>
                        <button className="card-header-icon">
                            <span className="icon">
                                <img
                                    src={CloseIcon}
                                    alt="Close Icon"
                                    onClick={() => this.setState({selectedPhoto: null})}/>
                            </span>
                        </button>
                    </header>
                    <div className="card-image">
                        <img src={this.state.selectedPhoto.image} alt={this.state.selectedPhoto.title}/>
                    </div>
                </div>
            </div>
        </div>
        : <></>;

    renderSortFilterModal = () =>
        <div class={`modal ${(this.state.showSortFilterModal && !this.state.selectedPhoto) ? 'is-active' : ''}`}>
            <div class="modal-background" onClick={() => this.setState({showSortFilterModal: false})}></div>
            <div class="modal-content">
                <div class="card">
                    <div class="card-header is-flex is-justify-content-space-around is-align-items-center">
                        <p class="card-header-title">Sort and Filter</p>
                        <button class="card-header-icon">
                            <span class="icon">
                                <img
                                    src={CloseIcon}
                                    alt="Close Icon"
                                    onClick={() => this.setState({showSortFilterModal: false})}/>
                            </span>
                        </button>
                    </div>
                    <div className="card-content">
                        <div className="field">
                            <label className="label">Sort</label>
                            <div className="control">
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={this.state.sortDirection === "newest"}
                                        onClick={() => this.setState({ sortDirection: 'newest' })}
                                    />
                                    &nbsp;Newest
                                </label>
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={this.state.sortDirection === "oldest"}
                                        onClick={() => this.setState({ sortDirection: 'oldest' })}
                                    />
                                    &nbsp;Oldest
                                </label>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Filter Subject</label>
                            <div className="control">
                                <label class="checkbox">
                                    {Subjects.map(subject =>
                                        <>
                                            <label class="checkbox">
                                                <input type="checkbox" onClick={() => this.onClickSubject(subject)} />
                                                &nbsp;{subject}
                                            </label>
                                            <br />
                                        </>)}
                                </label>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Filter Medium</label>
                            <div className="control">
                                {Mediums.map(medium =>
                                    <>
                                        <label className="checkbox">
                                            <input type="checkbox" onClick={() => this.onClickMedium(medium)}/>
                                            &nbsp;{medium}
                                        </label>
                                        <br />
                                    </>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    render() {
        return (
            <>
                <div className="is-flex is-justify-content-space-between is-align-items-center">
                    <div className="title mt-3 ml-3 is-2">An Art Gallery</div>
                    <img
                        className="is-flex-grow-0"
                        src={FilterIcon}
                        alt="Icon to open filter/sort menu"
                        onClick={() => this.setState({showSortFilterModal: true})}/>
                </div>
                <div className="subtitle ml-4">by: Zach Hensler</div>
                <div className="columns is-multiline is-variable is-6 m-auto">
                    {this.renderPhotoData()}
                </div>
                {this.renderSelectedPhotoModal()}
                {this.renderSortFilterModal()}
            </>
        )
    }
}
