const home = document.querySelector('div#home');

home.innerHTML = `
<div class="dashboard-header row col-12 mt-3 px-0">
<h3 class="col-3 pt-2 pl-3">My Projects</h3>
<div class="col-12 col-sm-6 col-md-8 text-right mb-2 px-0">
    <button class="btn btn-brand mt-2">Add Project</button>
</div>
</div>
<div class="projects-con row col-12 mt-5">
<div class=" scroller col-12 col-sm-5 mt-3 animated fadeInUp faster mx-auto col-md-5 col-lg-3 border-brand px-0 project">
    <div class="project-name">
        <h3 class="ml-2">Plannerr development</h3>
    </div>
    <div class="project-status mt-2">
        <h6 class="ml-2">Status: <span style="color: red;">Unfinished</span></h6>
    </div>
    <div class="project-activity">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Emma finished
                 <a style="text-decoration: none; cursor: pointer;">signup.html</a></li>
            <li class="list-group-item">Hannah uploaded new build</li>
            <li class="list-group-item">Mark finished product testing </li>
            <li class="list-group-item">Jane finished signup api</li>
            <li class="list-group-item">Emma finished index.html</li>
          </ul>
    </div>
</div>
<div class=" scroller col-12 col-sm-5 mt-3 animated fadeInUp faster mx-auto col-md-5 col-lg-3 border-brand px-0 project">
        <div class="project-name my-auto">
            <h3 class="ml-2">Primedpoll</h3>
        </div>
        <div class="project-status mt-2">
            <h6 class="ml-2">Status: <span style="color: red;">Unfinished</span></h6>
        </div>
        <div class="project-activity">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Emma finished
                     <a style="text-decoration: none; cursor: pointer;">signup.html</a></li>
                <li class="list-group-item">Hannah uploaded new build</li>
                <li class="list-group-item">Mark finished product testing </li>
                <li class="list-group-item">Jane finished signup api</li>
                <li class="list-group-item">Emma finished index.html</li>
              </ul>
        </div>
    </div>

<div class="col-12 col-sm-5 mt-3 animated fadeInUp faster mx-auto col-md-5 col-lg-3 border-brand project">

</div>

<div class="col-12 col-sm-5 mt-3 animated fadeInUp faster mx-auto col-md-5 col-lg-3 border-brand project">

</div>
</div>
</div>
`