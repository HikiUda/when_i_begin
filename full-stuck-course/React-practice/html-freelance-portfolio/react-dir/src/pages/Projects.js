import projects from './../helpers/projectsList'
import Project from '../components/progect/Progect'

const Projects = (props) => {
	return (
		<>
			<main className="section">
				<div className="container">
					<h2 className="title-1">Projects</h2>
					<ul className="projects">
						{
							projects.map((project, index) => {
								return <Project
									key={index}
									project={project}
									index={index} />
							})
						}
					</ul>
				</div>
			</main>
		</>
	);
}

export default Projects;