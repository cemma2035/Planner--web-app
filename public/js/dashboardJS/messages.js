const messages = document.querySelector('div#messages');

messages.innerHTML = `
    <div class="dashboard-header row col-12 mt-3 px-0">
        <h4 class="col-3 pt-2 pl-3">Message</h4>
        <div class="col-9 text-right mb-2 px-0">
            <button class="btn btn-success mt-2">Add Project</button>
        </div>
    </div>
    <div class="col-12 filter-con border">

    </div>
    <div class="projects-con row col-12 mt-5">
        <div class="col-12 col-sm-5 mt-3 mx-auto col-md-4 col-lg-3 project">

        </div>
        <div class="col-12 col-sm-5 mt-3 mx-auto col-md-4 col-lg-3 project">

        </div>

        <div class="col-12 col-sm-5 mt-3 mx-auto col-md-4 col-lg-3 project">

        </div>

        <div class="col-12 col-sm-5 mt-3 mx-auto col-md-4 col-lg-3 project">

        </div>
    </div>
`