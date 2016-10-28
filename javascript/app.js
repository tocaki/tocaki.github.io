$(function() {
  var FILTERS = {
    types:  new ArtistFilter('types', 'type'),
    cities: new ArtistFilter('cities', 'city'),
    genres: new ArtistFilter('genres', 'genre')
  };

  var $artists = $('.artist-card');

  function ArtistFilter(inputName, dataName) {
    this.inputName = inputName;
    this.dataName = dataName;
    this.values = [];

    this.$inputs = $('input:checkbox[name="' + this.inputName + '[]"]');
  }

  ArtistFilter.filter = function ($artists) {
    $artists.each(function() {
      var $artist = $(this);
      var tests = [];

      $.each(FILTERS, function (k, v) { tests.push(v.test($artist)); })

      if (tests.indexOf(false) === -1) {
        $artist.parent().stop().fadeIn(100);
      } else {
        $artist.parent().stop().fadeOut(100);
      }
    });
  };

  ArtistFilter.prototype.setupFilter = function () {
    var filter = this;

    filter.$inputs.on('change', function () {
      filter.values = filter.$inputs
        .filter(':checked')
        .map(function () {
          return this.value;
        })
        .get();

      ArtistFilter.filter($artists);
    });
  };

  ArtistFilter.prototype.test = function ($artist) {
    var filter = this;
    var res = $.map($artist.data(this.dataName).split(', '), function (v) {
      if (filter.values.indexOf(v) !== -1)
        return v;
    });

    return res.length !== 0 || this.values.length === 0;
  };

  $.each(FILTERS, function (k, v) { v.setupFilter(); });
});
