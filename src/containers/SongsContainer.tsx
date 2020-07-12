import SongsComponent from '../views/Timeline/Songs/Songs';
import { DispatchProps, StateProps } from '../views/Timeline/Songs/Songs';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../store/rootState';
import { SongsActionsTypes } from '../store/songs/songs.actions.types';
import { SongInterface } from '../store/songs/songs.interfaces';
import SongActions from '../store/songs/songs.actions';
import SongThunks from '../store/songs/songs.thunks';

const mapStateToProps = (state: RootState, props: { layerY: number }): StateProps => {
  return {
    lastIndex: state.songs.lastIndex,
    layerY: props.layerY,
    songs: state.songs.songs,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SongsActionsTypes>): DispatchProps => ({
  fetchSongs: (): void => dispatch(SongThunks.fetchSongs()),
  insertSong: (song: SongInterface): void => dispatch(SongThunks.insertSong(song)),
  updateSong: (song: SongInterface): void => dispatch(SongThunks.updateSong(song)),
  updateSongLocal: (song: SongInterface): SongsActionsTypes => dispatch(SongActions.UpdateSong(song)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

// The inferred type will look like:
// {isOn: boolean, toggleOn: () => void}
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connect(mapStateToProps, mapDispatchToProps)(SongsComponent);
