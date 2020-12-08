class Arrow_Cagri extends Animator  {
    constructor() {
        super();
        this.author = 'Çağrı Ege'
        this.desc = 'Throw Arrow'
		
        let x0 = "transform:scale(0.8)"
        let x1 = "translate(30px,5px)"
        let x2 = "translate(80px,20px)"
        let x3 = "translate(120px,45px)"
        let x4 = "transform:scale(0.6))"
		
        let x5 = "translate(200px,125px)"
        let x6 = "translate(240px,180px)"
        let x7 = "translate(280px,245px)"
        let x8 = "transform:scale(0.4)"
        let x9 = "translate(360px,420px)"
        let x10 = "translate(400px,500px)"
		this.url="https://raw.githubusercontent.com/cagriege/ileriProgramlama/main/ok.png"
        this.anim = { transform: [x0,x1, x2, x3, x4, x5, x6, x7, x8, x9, x10 ] }
        this.elt = document.createElement('img')
        this.elt.src =this.url
        this.time = 5000
    }
   
	 update() { } 
}