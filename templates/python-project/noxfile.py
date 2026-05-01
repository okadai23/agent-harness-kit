"""Reusable nox sessions for the Python project template."""

from __future__ import annotations

from pathlib import Path
from typing import TYPE_CHECKING

import nox

if TYPE_CHECKING:
    from nox.sessions import Session

nox.options.default_venv_backend = "uv"
nox.options.reuse_existing_virtualenvs = True

PYTHON_VERSIONS = ["3.13"]
PACKAGE = "your_package"
COVERAGE_MIN = 90


def install_dev(session: Session) -> None:
    """Install the project with development dependencies."""
    session.install("-e", ".[dev]")


@nox.session(python=PYTHON_VERSIONS, tags=["lint"])
def lint(session: Session) -> None:
    """Run Ruff lint checks."""
    session.install("ruff")
    session.run("ruff", "check", ".")


@nox.session(python=PYTHON_VERSIONS, tags=["format"])
def format_code(session: Session) -> None:
    """Format code with Ruff."""
    session.install("ruff")
    session.run("ruff", "format", ".")


@nox.session(python=PYTHON_VERSIONS, tags=["format"])
def format_check(session: Session) -> None:
    """Check formatting without modifying files."""
    session.install("ruff")
    session.run("ruff", "format", "--check", ".")


@nox.session(python=PYTHON_VERSIONS, tags=["typing"])
def typecheck(session: Session) -> None:
    """Run strict type checking with Pyright."""
    install_dev(session)
    session.run("pyright")


@nox.session(python=PYTHON_VERSIONS, tags=["test"])
def tests(session: Session) -> None:
    """Run pytest with coverage."""
    install_dev(session)
    session.run(
        "pytest",
        f"--cov={PACKAGE}",
        "--cov-report=term-missing",
        f"--cov-fail-under={COVERAGE_MIN}",
    )


@nox.session(python=PYTHON_VERSIONS, tags=["coverage"])
def coverage(session: Session) -> None:
    """Run tests and write XML/HTML coverage reports."""
    install_dev(session)
    session.run(
        "pytest",
        f"--cov={PACKAGE}",
        "--cov-report=term-missing",
        "--cov-report=xml",
        "--cov-report=html",
        f"--cov-fail-under={COVERAGE_MIN}",
    )


@nox.session(python=PYTHON_VERSIONS, tags=["security"])
def security(session: Session) -> None:
    """Audit installed dependencies."""
    session.install("pip-audit")
    session.run("pip-audit")


@nox.session(python=PYTHON_VERSIONS, tags=["docs"])
def docs(session: Session) -> None:
    """Build documentation when a docs command is configured."""
    if not Path("docs").exists():
        session.skip("No docs directory exists yet.")
    session.error("Add a docs build command for your chosen documentation tool.")


@nox.session(python=PYTHON_VERSIONS, tags=["ci"])
def ci(session: Session) -> None:
    """Run the default CI checks."""
    session.notify("lint")
    session.notify("format_check")
    session.notify("typecheck")
    session.notify("tests")
    session.notify("security")
