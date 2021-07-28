package comp.pts.hark.svr.web.rest;

import comp.pts.hark.svr.domain.Site;
import comp.pts.hark.svr.repository.SiteRepository;
import comp.pts.hark.svr.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link comp.pts.hark.svr.domain.Site}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SiteResource {

    private final Logger log = LoggerFactory.getLogger(SiteResource.class);

    private static final String ENTITY_NAME = "site";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SiteRepository siteRepository;

    public SiteResource(SiteRepository siteRepository) {
        this.siteRepository = siteRepository;
    }

    /**
     * {@code POST  /sites} : Create a new site.
     *
     * @param site the site to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new site, or with status {@code 400 (Bad Request)} if the site has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sites")
    public ResponseEntity<Site> createSite(@RequestBody Site site) throws URISyntaxException {
        log.debug("REST request to save Site : {}", site);
        if (site.getId() != null) {
            throw new BadRequestAlertException("A new site cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Site result = siteRepository.save(site);
        return ResponseEntity
            .created(new URI("/api/sites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sites/:id} : Updates an existing site.
     *
     * @param id the id of the site to save.
     * @param site the site to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated site,
     * or with status {@code 400 (Bad Request)} if the site is not valid,
     * or with status {@code 500 (Internal Server Error)} if the site couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sites/{id}")
    public ResponseEntity<Site> updateSite(@PathVariable(value = "id", required = false) final Long id, @RequestBody Site site)
        throws URISyntaxException {
        log.debug("REST request to update Site : {}, {}", id, site);
        if (site.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, site.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!siteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Site result = siteRepository.save(site);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, site.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /sites/:id} : Partial updates given fields of an existing site, field will ignore if it is null
     *
     * @param id the id of the site to save.
     * @param site the site to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated site,
     * or with status {@code 400 (Bad Request)} if the site is not valid,
     * or with status {@code 404 (Not Found)} if the site is not found,
     * or with status {@code 500 (Internal Server Error)} if the site couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/sites/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Site> partialUpdateSite(@PathVariable(value = "id", required = false) final Long id, @RequestBody Site site)
        throws URISyntaxException {
        log.debug("REST request to partial update Site partially : {}, {}", id, site);
        if (site.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, site.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!siteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Site> result = siteRepository
            .findById(site.getId())
            .map(
                existingSite -> {
                    if (site.getStatus() != null) {
                        existingSite.setStatus(site.getStatus());
                    }
                    if (site.getLastCheck() != null) {
                        existingSite.setLastCheck(site.getLastCheck());
                    }

                    return existingSite;
                }
            )
            .map(siteRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, site.getId().toString())
        );
    }

    /**
     * {@code GET  /sites} : get all the sites.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sites in body.
     */
    @GetMapping("/sites")
    public ResponseEntity<List<Site>> getAllSites(Pageable pageable) {
        log.debug("REST request to get a page of Sites");
        Page<Site> page = siteRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /sites/:id} : get the "id" site.
     *
     * @param id the id of the site to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the site, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sites/{id}")
    public ResponseEntity<Site> getSite(@PathVariable Long id) {
        log.debug("REST request to get Site : {}", id);
        Optional<Site> site = siteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(site);
    }

    /**
     * {@code DELETE  /sites/:id} : delete the "id" site.
     *
     * @param id the id of the site to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sites/{id}")
    public ResponseEntity<Void> deleteSite(@PathVariable Long id) {
        log.debug("REST request to delete Site : {}", id);
        siteRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
