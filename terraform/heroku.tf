resource "heroku_app" "staging" {
  name   = "${var.heroku_basename}-staging"
  region = "us"

  stack      = "heroku-22"
  buildpacks = [ "heroku/nodejs" ]
}

resource "heroku_app" "production" {
  name   = "${var.heroku_basename}-production"
  region = "us"

  stack      = "heroku-22"
  buildpacks = [ "heroku/nodejs" ]
}

resource "heroku_pipeline" "main" {
  name = var.heroku_basename
}

resource "heroku_pipeline_coupling" "staging" {
  app_id   = heroku_app.staging.id
  pipeline = heroku_pipeline.main.id
  stage    = "staging"
}

resource "heroku_pipeline_coupling" "production" {
  app_id   = heroku_app.production.id
  pipeline = heroku_pipeline.main.id
  stage    = "production"
}
