const Footer = () => {
  return (
    <footer className="bg-jet py-4 mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center text-secondary text-[14px]">
          © {new Date().getFullYear()} Michael Scrivo. Template based on awesome
          work by{' '}
          <a href="https://github.com/shaqdeff/Portfolio-Template">
            Shaquille Ndunda
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
