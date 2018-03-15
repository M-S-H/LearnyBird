webpackJsonp([1],[,,,,,,,,,,,,,,,,function(t,e,i){"use strict";var s=i(10),n=i(48),r=i(44),a=(i.n(r),i(43)),o=i.n(a);s.a.use(n.a),e.a=new n.a({routes:[{path:"/",name:"Home",component:o.a}]})},function(t,e){},function(t,e,i){var s=i(9)(i(24),i(47),null,null,null);t.exports=s.exports},function(t,e,i){"use strict";var s=i(1),n=i.n(s),r=i(2),a=i.n(r),o=function(){function t(){n()(this,t),this.x=80,this.y=250,this.width=40,this.height=30,this.alive=!0,this.gravity=0,this.velocity=.3,this.jump=-6}return a()(t,[{key:"fly",value:function(){this.gravity=this.jump}},{key:"update",value:function(){this.gravity+=this.velocity,this.y+=this.gravity}},{key:"isDead",value:function(t,e){if(this.y>=t||this.y+this.height<=0)return!0;for(var i in e)if(!(this.x>e[i].x+e[i].width||this.x+this.width<e[i].x||this.y>e[i].y+e[i].height||this.y+this.height<e[i].y))return!0}}]),t}();e.a=o},function(t,e,i){"use strict";var s=i(1),n=i.n(s),r=i(2),a=i.n(r),o=i(21),h=i(40),u=i.n(h),c=function(){function t(e){n()(this,t),this.genomes=[],this.numGenomes=e;for(var i=0;i<e;i++)this.genomes.push(new o.a)}return a()(t,[{key:"executeGeneration",value:function(t){for(var e=0;e<this.numGenomes;e++){this.genomes[e].fitness=0;for(var i=0;i<t.length;i++){var s=[t[i][0],t[i][1]],n=this.genomes[e].activate(s)[0];(n>=.5&&1===t[i][2]||n<.5&&-1===t[i][2])&&(this.genomes[e].fitness+=1)}}}},{key:"bestGenomes",value:function(){return this.genomes.sort(function(t,e){return e.fitness-t.fitness}),[this.genomes[0],this.genomes[1]]}},{key:"evolve",value:function(){this.genomes=this.bestGenomes();for(var t=0;t<2;t++){var e=u.a.cloneDeep(this.genomes[t]);e.mutate(),this.genomes.push(e)}for(;this.genomes.length<this.numGenomes;){var i=u.a.cloneDeep(this.genomes[0]),s=u.a.cloneDeep(this.genomes[1]);i.cross(s),i.mutate(),this.genomes.push(i)}}}]),t}();e.a=c},function(t,e,i){"use strict";var s=i(1),n=i.n(s),r=i(2),a=i.n(r),o=i(42),h=i.n(o),u=function(){function t(){n()(this,t),this.fitness=0,this.network=new h.a.Architect.Perceptron(2,2,1)}return a()(t,[{key:"cross",value:function(t){var e=void 0,i=void 0;Math.random()>.5?(e=this.network.toJSON(),i=t.network.toJSON()):(e=t.network.toJSON(),i=this.network.toJSON());for(var s=Math.round(e.neurons.length*Math.random()),n=s;n<e.neurons.length;n++){var r=e.neurons[n].bias;e.neurons[n].bias=i.neurons[n].bias,i.neurons[n].bias=r}this.network=h.a.Network.fromJSON(e)}},{key:"mutate",value:function(){for(var t=this.network.toJSON(),e=0;e<t.neurons.length;e++)Math.random()<.9||(t.neurons[e].bias+=t.neurons[e].bias*(Math.random()-.5)*3+(Math.random()-.5));for(var i=0;i<t.connections.length;i++)Math.random()<.9||(t.connections[i].weight+=t.connections[i].weight*(Math.random()-.5)*3+(Math.random()-.5));this.network=h.a.Network.fromJSON(t)}},{key:"activate",value:function(t){return this.network.activate(t)}}]),t}();e.a=u},function(t,e,i){"use strict";var s=i(1),n=i.n(s),r=i(2),a=i.n(r),o=function(){function t(e,i,s){n()(this,t),this.x=e,this.y=i,this.width=50,this.height=s,this.speed=3}return a()(t,[{key:"update",value:function(){this.x-=this.speed}},{key:"isOut",value:function(){return this.x+this.width<0}}]),t}();e.a=o},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(10),n=i(18),r=i.n(n),a=i(16);i(17),s.a.config.productionTip=!1,new s.a({el:"#app",router:a.a,template:"<App/>",components:{App:r.a}})},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"LearnyBird"}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(22),n=i(19),r=i(20);e.default={name:"Game",data:function(){return{canvas:null,context:null,fps:60,assets:{},loaded:!1,paused:!1,pausedTimer:null,gameParams:{backgroundSpeed:.5,backgroundPos:0,pipeInterval:90,interval:0},pipes:[],birds:[],aliveBirds:0,generation:0,currentScore:0,maxScore:0,neuro:new r.a(10)}},mounted:function(){this.start()},methods:{start:function(){this.canvas=document.querySelector("#game"),this.context=this.canvas.getContext("2d"),this.loadAssets(),this.reset()},reset:function(){var t=this;this.birds=[];for(var e=0;e<this.neuro.numGenomes;e++){var i=new n.a;this.birds.push(i)}this.gameParams.interval=0,this.pipes=[],this.currentScore=0,this.generation++,this.update(),window.addEventListener("resize",function(){t.paused=!0,clearTimeout(t.pausedTimer),t.pausedTimer=setTimeout(function(){t.paused=!1},250)})},loadAssets:function(){for(var t=this,e=0,i=["bird","background","pipetop","pipebottom"],s=0;s<i.length;s++){var n=i[s];this.assets[n]=new Image,this.assets[n].src="static/neuro/"+n+".png",this.assets[n].onload=function(){4==++e&&(t.loaded=!0,t.render())}}},jump:function(){this.birds[0].fly()},update:function(){var t=512/window.innerHeight;this.gameParams.backgroundPos+=this.gameParams.backgroundSpeed;var e=0;if(this.birds.length>0)for(var i=0;i<this.pipes.length;i+=2)if(this.pipes[i].x+this.pipes[i].width>this.birds[0].x){e=this.pipes[i].height/window.innerHeight;break}for(var n in this.birds)if(this.birds[n].alive){var r=[this.birds[n].y/window.innerHeight,e],a=this.neuro.genomes[n].activate(r)[0];a>.5&&this.birds[n].fly(),this.birds[n].update(),this.birds[n].isDead(window.innerHeight,this.pipes)&&(this.birds[n].alive=!1,this.neuro.genomes[n].fitness=this.score)}if(0===this.gameParams.interval){var o=Math.round(292*Math.random())+50;this.pipes.push(new s.a(window.outerWidth*t,0,o)),this.pipes.push(new s.a(window.outerWidth*t,o+120,window.outerHeight))}for(var h=0;h<this.pipes.length;h++)this.pipes[h].update();this.gameParams.interval=window.outerWidth*t-this.pipes[this.pipes.length-1].x,this.gameParams.interval>270&&(this.gameParams.interval=0),this.isOver()?(this.neuro.evolve(),this.reset()):(this.currentScore++,this.currentScore>this.maxScore&&(this.maxScore=this.currentScore),this.canUpdate())},canUpdate:function(){var t=this;this.paused?setTimeout(function(){t.canUpdate()},250):setTimeout(function(){t.update()},1e3/this.fps)},render:function(){this.context.clearRect(0,0,this.width,this.height),this.canvas.style.height="100%",this.canvas.width=Math.ceil(window.outerWidth*(512/window.innerHeight));for(var t=window.innerHeight/512,e=this.assets.background.width,i=window.outerWidth,s=0;s<Math.ceil(i/(e*t))+1;s++)this.context.drawImage(this.assets.background,s*e-Math.floor(this.gameParams.backgroundPos%this.assets.background.width),0);for(var n in this.birds)this.birds[n].alive&&(this.context.save(),this.context.translate(this.birds[n].x+this.birds[n].width/2,this.birds[n].y+this.birds[n].height/2),this.context.rotate(Math.PI/2*this.birds[n].gravity/20),this.context.drawImage(this.assets.bird,-this.birds[n].width/2,-this.birds[n].height/2,this.birds[n].width,this.birds[n].height),this.context.restore());for(var r in this.pipes)r%2==0?this.context.drawImage(this.assets.pipetop,this.pipes[r].x,this.pipes[r].y+this.pipes[r].height-this.assets.pipetop.height,this.pipes[r].width,this.assets.pipetop.height):this.context.drawImage(this.assets.pipebottom,this.pipes[r].x,this.pipes[r].y,this.pipes[r].width,this.assets.pipebottom.height);var a=this;requestAnimationFrame(function(){a.render()})},isOver:function(){for(var t in this.birds)if(this.birds[t].alive)return!1;return!0}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Home"}},,,,,,,,,,,,,function(t,e){},,,,function(t,e,i){function s(t){i(39)}var n=i(9)(i(25),i(46),s,null,null);t.exports=n.exports},function(t,e,i){var s=i(9)(i(26),i(45),null,null,null);t.exports=s.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home"},[i("h1",[t._v("Home")]),t._v(" "),i("router-link",{attrs:{to:"/genetics"}},[t._v("Go to Foo")])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"neurogame"},[i("div",{staticClass:"game-info"},[i("span",{staticClass:"generation"},[t._v("Gen: "+t._s(t.generation))]),t._v(" "),i("span",{staticClass:"current-scroe"},[t._v("Score: "+t._s(t.currentScore))]),t._v(" "),i("span",{staticClass:"max-score"},[t._v("Max: "+t._s(t.maxScore))])]),t._v(" "),i("canvas",{attrs:{id:"game",height:"512px"},on:{click:t.jump}})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("main",{attrs:{id:"app"}},[i("router-view")],1)},staticRenderFns:[]}}],[23]);
//# sourceMappingURL=app.b8b84a8678c0a14d773b.js.map