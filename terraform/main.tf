terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 4.0"
    }

    heroku = {
      source  = "heroku/heroku"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "dccc-intros"
    key            = "state"
    dynamodb_table = "terraform"
  }
}

provider "heroku" { }
