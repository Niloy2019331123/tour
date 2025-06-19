import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

// Mock the components that are used in Home
jest.mock('../components/Featured-tours/FeaturedTourList', () => () => <div data-testid="featured-tours">Featured Tours</div>);
jest.mock('../services/ServiceList', () => () => <div data-testid="service-list">Services</div>);
jest.mock('../shared/SearchBar', () => () => <div data-testid="search-bar">Search Bar</div>);
jest.mock('../components/Image-gallery/MasonryImagesGallery', () => () => <div data-testid="gallery">Gallery</div>);
jest.mock('../components/Testimonial/Testimonials', () => () => <div data-testid="testimonials">Testimonials</div>);
jest.mock('../shared/Newsletter', () => () => <div data-testid="newsletter">Newsletter</div>);
jest.mock('../components/Map/LocationMap', () => () => <div data-testid="location-map">Location Map</div>);

describe('Home Component', () => {
  const renderHome = () => {
    return render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    renderHome();
  });

  describe('Hero Section', () => {
    test('renders hero section with correct content', () => {
      expect(screen.getByText(/Know before You Go/i)).toBeInTheDocument();
      expect(screen.getByText(/Travelling opens the door to creating/i)).toBeInTheDocument();
      expect(screen.getByText(/memories/i)).toBeInTheDocument();
    });

    test('renders hero images and video', () => {
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
      expect(screen.getByRole('video')).toBeInTheDocument();
    });
  });

  describe('Location Map Section', () => {
    test('renders location map section', () => {
      expect(screen.getByText(/Your Location/i)).toBeInTheDocument();
      expect(screen.getByText(/Find yourself on the map/i)).toBeInTheDocument();
      expect(screen.getByTestId('location-map')).toBeInTheDocument();
    });
  });

  describe('Services Section', () => {
    test('renders services section', () => {
      expect(screen.getByText(/What we serve/i)).toBeInTheDocument();
      expect(screen.getByText(/We offer our best services/i)).toBeInTheDocument();
      expect(screen.getByTestId('service-list')).toBeInTheDocument();
    });
  });

  describe('Featured Tours Section', () => {
    test('renders featured tours section', () => {
      expect(screen.getByText(/Explore/i)).toBeInTheDocument();
      expect(screen.getByText(/Our featured tours/i)).toBeInTheDocument();
      expect(screen.getByTestId('featured-tours')).toBeInTheDocument();
    });
  });

  describe('Experience Section', () => {
    test('renders experience section with statistics', () => {
      expect(screen.getByText(/Experience/i)).toBeInTheDocument();
      expect(screen.getByText(/With our all experience/i)).toBeInTheDocument();
      expect(screen.getByText('12k+')).toBeInTheDocument();
      expect(screen.getByText('2k+')).toBeInTheDocument();
      expect(screen.getByText('15')).toBeInTheDocument();
    });
  });

  describe('Gallery Section', () => {
    test('renders gallery section', () => {
      expect(screen.getByText(/Gallery/i)).toBeInTheDocument();
      expect(screen.getByText(/Visit our customers tour gallery/i)).toBeInTheDocument();
      expect(screen.getByTestId('gallery')).toBeInTheDocument();
    });
  });

  describe('Testimonials Section', () => {
    test('renders testimonials section', () => {
      expect(screen.getByText(/Fans Love/i)).toBeInTheDocument();
      expect(screen.getByText(/What our fans say about us/i)).toBeInTheDocument();
      expect(screen.getByTestId('testimonials')).toBeInTheDocument();
    });
  });

  describe('Newsletter Section', () => {
    test('renders newsletter section', () => {
      expect(screen.getByTestId('newsletter')).toBeInTheDocument();
    });
  });
}); 