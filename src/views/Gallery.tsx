import {Component} from "preact";

import photoData, {Mediums, MediumsType, PhotoDataType, Subjects, SubjectsType} from "../constants/photoData.ts";
import FilterIcon from '../assets/icons/FilterIcon.svg';
import CloseIcon from '../assets/icons/CloseIcon.svg';

interface GalleryState {
    showSortFilterModal: boolean
    selectedPhoto: PhotoDataType|null
    sortDirection: 'newest'|'oldest',
    filteredMediums: MediumsType[]
    filteredSubjects: SubjectsType[]
}

export class Gallery extends Component<{},GalleryState> {
    state: GalleryState = {
        showSortFilterModal: false,
        selectedPhoto: null,
        sortDirection: 'newest',
        filteredMediums: [],
        filteredSubjects: []
    }

    onClickSubject = (clickedSubject: SubjectsType) => this.setState({
        filteredSubjects: this.state.filteredSubjects.includes(clickedSubject)
            ? this.state.filteredSubjects.filter(s => s !== clickedSubject)
            : [ ...this.state.filteredSubjects, clickedSubject ]
    })

    onClickMedium = (clickedMedium: MediumsType) => this.setState({
        filteredMediums: this.state.filteredMediums.includes(clickedMedium)
            ? this.state.filteredMediums.filter(s => s !== clickedMedium)
            : [ ...this.state.filteredMediums, clickedMedium ]
    })

    sortPhotos = (unsortedPhotos: PhotoDataType[]): PhotoDataType[] => [...unsortedPhotos].sort((a, b) => this.state.sortDirection === 'newest'
        ? new Date(b.date).valueOf() - new Date(a.date).valueOf()
        : new Date(a.date).valueOf() - new Date(b.date).valueOf())

    filterPhotos = (unfilteredPhotos: PhotoDataType[]): PhotoDataType[] =>
        unfilteredPhotos.filter(photo =>
            (!this.state.filteredSubjects.length || this.state.filteredSubjects.includes(photo.subject)) &&
            (!this.state.filteredMediums.length || this.state.filteredMediums.find(medium => photo.medium.includes(medium))))

    renderPhotoData = () => this.sortPhotos(this.filterPhotos(photoData))
        .map(photo =>
            <div className="card column is-one-third my-4">
                <header className="card-header">
                    <p className="card-header-title">{photo.title}</p>
                </header>
                <div className="card-image" onClick={() => this.setState({selectedPhoto: photo})}>
                    <img src={photo.image} alt={photo.title}/>
                </div>
                <div className="card-content">
                    <div className="content">Date: {photo.date}</div>
                    <div className="content">Medium: {photo.medium}</div>
                </div>
            </div>)

    renderSelectedPhotoModal = () => this.state.selectedPhoto
        ? <div class={`modal ${this.state.selectedPhoto ? 'is-active' : ''}`}>
            <div class="modal-background" onClick={() => this.setState({selectedPhoto: null})}></div>
            <div className="modal-content">
                <div className={`card`}>
                    <header className="card-header">
                        <p className="card-header-title">{this.state.selectedPhoto.title}</p>
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
                    <div className="card-content">
                        <div className="content">Date: {this.state.selectedPhoto.date}</div>
                        <div className="content">Medium: {this.state.selectedPhoto.medium}</div>
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
