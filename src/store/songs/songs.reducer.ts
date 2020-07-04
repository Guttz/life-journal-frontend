import { ON_INSERT_SONG, ON_UPDATE_SONG, ON_DELETE_SONG, ON_SET_SONGS } from './songs.actions';
import { SongInterface, SongsInterface } from './songs.interfaces';
import { SongsActionsTypes } from './songs.actions.types';

const defaultState: SongsInterface = {
  lastIndex: 0,
  songs: [
    {
      id: 10,
      name: 'The music history',
      artists: ['Mc Anônimo'],
      timelineDate: new Date(),
      previewURL:
        'https://p.scdn.co/mp3-preview/6bca32671e4b4ad1ffd06098116156b25c2ecb03?cid=21dbe53cbabe4f03b2ad3090342a7bbc',
      imageURL: 'https://i.scdn.co/image/ab67616d00004851b6fc75952c040034b98be0d3',
      importance: 0.5,
      x: 150,
      y: 150,
    },
    {
      id: 11,
      name: 'Pagou De Superada',
      artists: ['Gustavo Morais', 'Anitta'],
      timelineDate: new Date(),
      previewURL:
        'https://p.scdn.co/mp3-preview/5331b61d2f5e5785b0d909b183bcdcc1e50db549?cid=21dbe53cbabe4f03b2ad3090342a7bbc',
      imageURL: 'https://i.scdn.co/image/ab67616d00004851dea627d98a8de6a466932965',
      importance: 0.7,
      x: 300,
      y: 300,
    },
    {
      id: 12,
      name: 'Vem Me Satisfazer',
      artists: ['MC Ingryd', 'DJ Henrique da VK'],
      timelineDate: new Date(),
      previewURL:
        'https://p.scdn.co/mp3-preview/2eb58d711156dd4910d241f6fe4018f39d693236?cid=21dbe53cbabe4f03b2ad3090342a7bbc',
      imageURL: 'https://i.scdn.co/image/ab67616d00004851a2f03baa21791237c1fd42c0',
      importance: 0.9,
      x: 300,
      y: 300,
    },
  ],
};

// [Question] Defining return type of a whole reducer/state aprt
export default (state = defaultState, action: SongsActionsTypes): SongsInterface => {
  switch (action.type) {
    case ON_INSERT_SONG: {
      const newSong: SongInterface = {
        ...action.song,
        id: state.lastIndex + 1,
      };
      return { ...state, lastIndex: state.lastIndex + 1, songs: [...state.songs, newSong] };
    }
    case ON_UPDATE_SONG: {
      const updatedSong: SongInterface = { ...action.song };
      const updatedSongs = state.songs.filter(auxSong => auxSong.id !== updatedSong.id);
      return { ...state, lastIndex: state.lastIndex + 1, songs: [...updatedSongs, updatedSong] };
    }
    case ON_DELETE_SONG: {
      return { ...state, songs: [...state.songs.slice(0, action.id), ...state.songs.slice(action.id + 1)] };
    }
    case ON_SET_SONGS: {
      return { ...state, songs: action.songs };
    }
    default:
      return state;
  }
};
