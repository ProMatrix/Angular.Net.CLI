"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GoogleMaps = /** @class */ (function () {
    function GoogleMaps(cd, ngZone) {
        this.cd = cd;
        this.ngZone = ngZone;
        this.width = "";
        this.height = "";
        this.widthPercent = "";
        this.heightPercent = "";
        this.visibleChange = new core_1.EventEmitter();
        this.maplat = 0;
        this.maplng = 0;
    }
    GoogleMaps_1 = GoogleMaps;
    GoogleMaps.prototype.initialize = function () {
        var _this = this;
        this.url = "https://maps.googleapis.com/maps/api/js?key=" + this.googleMapKey + "&callback=__onGoogleLoaded";
        GoogleMaps_1.promise = new Promise(function () {
            window["__onGoogleLoaded"] = function () {
                _this.loadGoogleMaps();
            };
            var node = document.createElement("script");
            node.src = _this.url;
            node.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(node);
        });
        return GoogleMaps_1.promise;
    };
    GoogleMaps.prototype.loadGoogleMaps = function () {
        var _this = this;
        if (!isNaN(this.latitude) && !isNaN(this.longitude)) {
            this.maplat = this.latitude;
            this.maplng = this.longitude;
        }
        var mapProp = {
            center: new google.maps.LatLng(this.maplat, this.maplng),
            zoom: 13,
            fullscreenControl: false,
            streetViewControl: false
        };
        this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        this.marker = new google.maps.Marker({ position: new google.maps.LatLng(this.maplat, this.maplng), draggable: true });
        this.marker.setMap(this.map);
        google.maps.event.addListener(this.map, "click", function (event) {
            _this.marker.setPosition(event.latLng);
            _this.latitude = event.latLng.lat();
            _this.longitude = event.latLng.lng();
        });
        var contentInfoWindow = "\n        <div>\n        <div>Set the Latitude and Longitude</div>\n        <div>to this marker location?</div>\n        <button style=\"margin-top:.5em;\" class=\"btn btn-primary btn-xs buttonUpdateCoordsFromMarkerLocation\">Update</button>\n        </div>";
        google.maps.event.addListener(this.marker, "click", function () {
            var div = document.createElement("div");
            div.innerHTML = contentInfoWindow;
            var buttonUpdateCoordsFromMarkerLocation = div.getElementsByClassName("buttonUpdateCoordsFromMarkerLocation");
            if (buttonUpdateCoordsFromMarkerLocation.length) {
                (buttonUpdateCoordsFromMarkerLocation[0]).onclick = function () {
                    _this.onClickUpdateCoordsFromMarkerLocation();
                };
            }
            var infowindow = new google.maps.InfoWindow({
                content: div
            });
            infowindow.open(_this.map, _this.marker);
        });
        google.maps.event.addListener(this.marker, "dragend", function (event) {
            _this.latitude = event.latLng.lat();
            _this.longitude = event.latLng.lng();
        });
    };
    GoogleMaps.prototype.recenterMapAndMarker = function () {
        if (!isNaN(this.latitude) && !isNaN(this.longitude)) {
            this.maplat = this.latitude;
            this.maplng = this.longitude;
            var latLgn = new google.maps.LatLng(this.maplat, this.maplng);
            this.map.setCenter(latLgn);
            this.marker.setPosition(latLgn);
        }
    };
    GoogleMaps.prototype.markerDragEnd = function (m, $event) {
        this.latitude = $event.latLng.lat();
        this.longitude = $event.latLng.lng();
    };
    GoogleMaps.prototype.onClickUpdateCoordsFromMarkerLocation = function () {
        var _this = this;
        this.ngZone.run(function () {
            _this.updateOwner();
        });
    };
    GoogleMaps.prototype.updateOwner = function () {
        if (this.owner && this.updateCoordinatesCallback) {
            this.owner[this.updateCoordinatesCallback](Math.round(this.latitude * 100000) / 100000, Math.round(this.longitude * 100000) / 100000);
        }
    };
    GoogleMaps.prototype.onBlurLatLng = function () {
        this.recenterMapAndMarker();
    };
    GoogleMaps.prototype.findMe = function () {
        var _this = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                _this.recenterMapAndMarker();
                _this.updateOwner();
            }, function (error) {
                alert(error.message);
            });
        }
    };
    GoogleMaps.prototype.useAddress = function (address, zipcode) {
        var _this = this;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ "address": address + " " + zipcode }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                _this.latitude = results[0].geometry.location.lat();
                _this.longitude = results[0].geometry.location.lng();
                _this.recenterMapAndMarker();
                _this.updateOwner();
            }
            else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    };
    GoogleMaps.prototype.lookupAddress = function () {
        var _this = this;
        var geocoder = new google.maps.Geocoder();
        var latlng = { lat: this.latitude, lng: this.longitude };
        geocoder.geocode({ "location": latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                results[0].formatted_address;
                var address = results[0].address_components[0].short_name + " " + results[0].address_components[1].short_name;
                _this.owner[_this.updateAddressCallback](address, results[0].address_components[7].short_name);
            }
            else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    };
    var GoogleMaps_1;
    __decorate([
        core_1.Input()
    ], GoogleMaps.prototype, "isVisible", void 0);
    __decorate([
        core_1.Input()
    ], GoogleMaps.prototype, "owner", void 0);
    __decorate([
        core_1.Input()
    ], GoogleMaps.prototype, "updateCoordinatesCallback", void 0);
    __decorate([
        core_1.Input()
    ], GoogleMaps.prototype, "updateAddressCallback", void 0);
    __decorate([
        core_1.Input()
    ], GoogleMaps.prototype, "width", void 0);
    __decorate([
        core_1.Input()
    ], GoogleMaps.prototype, "height", void 0);
    __decorate([
        core_1.Input()
    ], GoogleMaps.prototype, "widthPercent", void 0);
    __decorate([
        core_1.Input()
    ], GoogleMaps.prototype, "heightPercent", void 0);
    __decorate([
        core_1.Input()
    ], GoogleMaps.prototype, "latitude", void 0);
    __decorate([
        core_1.Input()
    ], GoogleMaps.prototype, "longitude", void 0);
    __decorate([
        core_1.Output()
    ], GoogleMaps.prototype, "visibleChange", void 0);
    GoogleMaps = GoogleMaps_1 = __decorate([
        core_1.Component({
            selector: "google-maps",
            //#region template:
            template: "<div id=\"googleMap\" [style.height.px]=\"height\" [style.height.%]=\"heightPercent\" [style.width.px]=\"width\" [style.width.%]=\"widthPercent\" ></div>"
            // #endregion
        })
    ], GoogleMaps);
    return GoogleMaps;
}());
exports.GoogleMaps = GoogleMaps;
//# sourceMappingURL=googleMaps.js.map