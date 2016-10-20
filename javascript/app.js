$(function() {
  var artistsFilter = {
    types: [],
    cities: [],
    genres: []
  };

  function $filterCard(name) {
    return $('input:checkbox[name="' + name + '[]"]');
  }

  function filter($filterCard, filter) {
    return function() {
      artistsFilter[filter] = $filterCard
        .filter(':checked')
        .map(function () {
          return this.value;
        })
        .get();

      filterArtists($('.artist-card'));
    }
  }

  function passFilter(filter, value) {
    return artistsFilter[filter].indexOf(value) !== -1 || artistsFilter[filter].length === 0;
  }

  function filterArtists(artists) {
    artists.each(function() {
      var $this = $(this);

      if (
        passFilter('types', $this.data('type')) &&
        passFilter('cities', $this.data('city')) &&
        passFilter('genres', $this.data('genre'))
      ) {
        $this.stop().fadeIn(100);
      } else {
        $this.stop().fadeOut(100);
      }
    });
  }

  var $types = $filterCard('types');
  var $cities = $filterCard('cities');
  var $genres = $filterCard('genres');

  $types.change(filter($types, 'types'));
  $cities.change(filter($cities, 'cities'));
  $genres.change(filter($genres, 'genres'));
});
