import {Component} from "preact";

import photoData, { PhotoDataType } from "../constants/photoData.ts";

interface GalleryState {
    selectedPhoto: PhotoDataType|null
}

export class Gallery extends Component<{},GalleryState> {
    state = {
        selectedPhoto: null
    }

    renderPhotoCard = (photo: PhotoDataType, containerClasses: string = '') =>
        <div class={`card ${containerClasses}`}>
            <header class="card-header">
                <p class="card-header-title">{photo.title}</p>
            </header>
            <div class="card-image" onClick={() => this.setState({ selectedPhoto: photo })}>
                <img src={photo.image} alt={photo.title}/>
            </div>
            <div class="card-content">
                <div class="content">Date: {photo.date}</div>
                <div class="content">Medium: {photo.medium}</div>
            </div>
        </div>

    renderPhotoData = () => photoData.map(photo => this.renderPhotoCard(photo, 'column is-5 m-2'))

    renderSelectedPhotoModal = () => this.state.selectedPhoto
        ? <div class={`modal ${this.state.selectedPhoto ? 'is-active' : ''}`}>
            <div class="modal-background" onClick={() => this.setState({ selectedPhoto: null })}></div>
            <div class="modal-content">{this.renderPhotoCard(this.state.selectedPhoto)}</div>
        </div>
        : <></>;

    render() {
        return (
            <div class="columns is-multiline m-auto">
                {this.renderPhotoData()}
                {this.renderSelectedPhotoModal()}
            </div>
        )
    }
}
