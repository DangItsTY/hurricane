var IMAGEPATH = 'images/';
var RUNPATH = 'runs/';

//	globals
var thePlayer = null;
var theFloor = null;
var theStartPlatform = null;
var mainElement = document.getElementById('content');
var debugElement = document.getElementById('debug');
var windAudio = null;
var jumpAudio = null;
var flapAudio = null;
var theObjects = [];
var gameState = "start";
var points = 0;
var GAME_WIDTH = 800;
var GAME_HEIGHT = 450;
var level = 1;
var hurricaneLevel = false;