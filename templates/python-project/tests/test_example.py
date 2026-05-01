"""Tests for the sample example module."""

from your_package import add


def test_add_returns_sum() -> None:
    """The sample function returns the sum of two integers."""
    assert add(2, 3) == 5
