/*Directed graph implementation*/

function Node(){
	this.name = "";
	this.weight = 0;
	this.velX =0;
	this.velY =0;
	this.x = 0;
	this.y = 0;
}

Node.prototype.randomizeLocation = function(){
	   this.x=Math.floor(Math.random()*300)+400;
       this.y=Math.floor(Math.random()*300)+200;
}

function Edge(from, to){
	this.from = from;
	this.to = to;
}



function Graph(){
	this.directed = false;
	this.n = 0;
	this.edgesList   = new Array();
	this.nodesList = new Array();
	this.totalKinetic =0;
	this.repulsion	= 100;
	this.attraction	= 0.06;
	this.damping	= 0.9;
}

Graph.prototype.setNodes = function(nodes){
	this.nodesList = nodes;
}

Graph.prototype.setEdges = function(edges){
	this.edgesList = edges;
}

Graph.prototype.addEdge = function(edge){
	this.edgesList.push(edge);
}

Graph.prototype.addNode = function(node){
	this.nodesList.push(node);
}
	
Graph.prototype.getNodeNeighbours = function(nodeID){
    var neighbours = new Array();
	for(var i=0; i<this.edgesList.length; i++){
			if(this.edgesList[i].from==nodeID){
				neighbours.push(this.edgesList[i].to);
				console.log(this.edgesList[i].to);
			}

			else if(this.edgesList[i].to==nodeID){
				neighbours.push(this.edgesList[i].from);
				console.log(this.edgesList[i].from);
			}
	}


	return neighbours;
}



Graph.prototype.forces = function(){

	for(var i=0; i<this.nodesList.length; i++){
		netForceX = 0;
		netForceY = 0;
		var dsq;
		var a = this.nodesList[i];
		/*calculate repulsion*/
		for(var j=0; j<this.nodesList.length; j++){
			var b = this.nodesList[j];
			if(j!=i){
				// net-force := net-force + Coulomb_repulsion( this_node, other_node )

				netForceY+=0;//coloumbForY;
				netForceX+=0;//coloumbForX;

				dsq = (a.x - b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y);
				if(dsq==0) dsq = 0.001;
				var c = this.repulsion/dsq;
				a.velX += c * (a.x-b.x);
				a.velY += c * (a.y-b.y);
			}
		}
		var neighbours = this.getNodeNeighbours(i);

		for(var j=0; j<neighbours.length; j++){
			// net-force := net-force + Hooke_attraction( this_node, spring )

			var b = this.nodesList[neighbours[j]];
			a.velX += this.attraction*(b.x - a.x);
			a.velY += this.attraction*(b.y - a.y);
			b.velX += this.attraction*(a.x - b.x);
			b.velY += this.attraction*(a.y - b.y);
		}

		var dis = 0;
		for(var j=0; j<this.nodesList.length; j++){
			
		    a = this.nodesList[i];
			
			a.x = (a.x + a.velX/20)*0.9;
			a.y = (a.y + a.velY/20)*0.9;

			
		}
	}
}
Graph.prototype.render = function(canvasName){

  		var canvas = document.getElementById(canvasName);
        canvas.width = canvas.width;
        if(canvas.getContext){

          	var ctx = canvas.getContext('2d');           
            for(var i=0; i<this.edgesList.length; i++){
                var node1 = this.nodesList[this.edgesList[i].from];
                var node2 = this.nodesList[this.edgesList[i].to];

                x1 = node1.x+400; y1=node1.y+400;
                x2 = node2.x+400; y2=node2.y+400;
                
                 ctx.strokeStyle="#616161";
                 ctx.beginPath();
                 ctx.moveTo(x1,y1);
                 ctx.lineTo(x2,y2);  
                 ctx.closePath();
                 ctx.stroke();
            }          
           
          //draw nodes
          for(var i=0; i<this.nodesList.length; i++){
                var tempVertex = this.nodesList[i];
                ctx.fillStyle="#5c7d3c";
                ctx.beginPath();
                ctx.arc(tempVertex.x+400,tempVertex.y+400,5+this.getNodeNeighbours(i).length,0,Math.PI*2,true);
                ctx.closePath();
                ctx.fill();
          }
          
        
        }
}